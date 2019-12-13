
#ifdef GL_ES
precision highp float;
precision highp int;
#endif
uniform sampler2DRect		inputImage;
uniform vec4		_inputImage_imgRect;
uniform vec2		_inputImage_imgSize;
uniform bool		_inputImage_flip;
uniform vec2		preShift;
uniform float		feedbackLevel;
uniform float		rotateAngle;
uniform float		zoomLevel;
uniform vec2		zoomCenter;
uniform vec2		feedbackShift;
uniform bool		invert;
uniform int		blendMode;
uniform float		blackThresh;
uniform float		satLevel;
uniform float		colorShift;
uniform sampler2DRect		feedbackBuffer;
uniform vec4		_feedbackBuffer_imgRect;
uniform vec2		_feedbackBuffer_imgSize;
uniform bool		_feedbackBuffer_flip;
uniform int		PASSINDEX;
uniform vec2		RENDERSIZE;
varying vec2		isf_FragNormCoord;
varying vec3		isf_VertNorm;
varying vec3		isf_VertPos;
uniform float		TIME;
uniform float		TIMEDELTA;
uniform vec4		DATE;
uniform int		FRAMEINDEX;
vec4 VVSAMPLER_2DRECTBYPIXEL(sampler2DRect sampler, vec4 samplerImgRect, vec2 samplerImgSize, bool samplerFlip, vec2 loc)	{
	return (samplerFlip)
		? texture2DRect	(sampler,vec2(((loc.x/samplerImgSize.x*samplerImgRect.z)+samplerImgRect.x), (samplerImgRect.w-(loc.y/samplerImgSize.y*samplerImgRect.w)+samplerImgRect.y)))
		: texture2DRect	(sampler,vec2(((loc.x/samplerImgSize.x*samplerImgRect.z)+samplerImgRect.x), ((loc.y/samplerImgSize.y*samplerImgRect.w)+samplerImgRect.y)));
}
vec4 VVSAMPLER_2DRECTBYNORM(sampler2DRect sampler, vec4 samplerImgRect, vec2 samplerImgSize, bool samplerFlip, vec2 normLoc)	{
	vec4		returnMe = VVSAMPLER_2DRECTBYPIXEL(	sampler,samplerImgRect,samplerImgSize,samplerFlip,vec2(normLoc.x*samplerImgRect.z, normLoc.y*samplerImgRect.w));
	return returnMe;
}


const float pi = 3.14159265359;


vec3 rgb2hsv(vec3 c)	{
	vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
	//vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
	//vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
	vec4 p = c.g < c.b ? vec4(c.bg, K.wz) : vec4(c.gb, K.xy);
	vec4 q = c.r < p.x ? vec4(p.xyw, c.r) : vec4(c.r, p.yzx);
	
	float d = q.x - min(q.w, q.y);
	float e = 1.0e-10;
	return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

vec3 hsv2rgb(vec3 c)	{
	vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
	vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
	return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}



void main()	{
	vec2		loc = gl_FragCoord.xy;
	vec4		inputPixelColor = VVSAMPLER_2DRECTBYNORM(inputImage, _inputImage_imgRect, _inputImage_imgSize, _inputImage_flip, loc + (0.5 - (preShift)));
	
	vec4		feedbackPixelColor = vec4(0.0);
	
	//	rotate here if needed
	loc = loc * RENDERSIZE;
	float		r = distance(RENDERSIZE/2.0, loc);
	float		a = atan ((loc.y-RENDERSIZE.y/2.0),(loc.x-RENDERSIZE.x/2.0));

	loc.x = r * cos(a + 2.0 * pi * rotateAngle - pi) + 0.5;
	loc.y = r * sin(a + 2.0 * pi * rotateAngle - pi) + 0.5;
	
	loc = loc / RENDERSIZE + vec2(0.5);
	
	vec2		modifiedCenter = zoomCenter;
	loc.x = (loc.x - modifiedCenter.x)*(1.0/zoomLevel) + modifiedCenter.x;
	loc.y = (loc.y - modifiedCenter.y)*(1.0/zoomLevel) + modifiedCenter.y;
	loc += (0.5 - (feedbackShift));
	
	if ((loc.x < 0.0)||(loc.y < 0.0)||(loc.x > 1.0)||(loc.y > 1.0))	{
		feedbackPixelColor = vec4(0.0);
	}
	else	{
		feedbackPixelColor = VVSAMPLER_2DRECTBYNORM(feedbackBuffer, _feedbackBuffer_imgRect, _feedbackBuffer_imgSize, _feedbackBuffer_flip, loc);
	}
	
	feedbackPixelColor.rgb = rgb2hsv(feedbackPixelColor.rgb);
	feedbackPixelColor.r = mod(feedbackPixelColor.r+colorShift,1.0);
	feedbackPixelColor.g *= satLevel;
	
	feedbackPixelColor.rgb = hsv2rgb(feedbackPixelColor.rgb);
	
	if (invert)
		feedbackPixelColor.rgb = 1.0 - feedbackPixelColor.rgb;
	
	if (blendMode == 0)	{
		inputPixelColor = inputPixelColor + feedbackLevel * feedbackPixelColor;
	}
	else if (blendMode == 1)	{
		float		val = inputPixelColor.a * (inputPixelColor.r + inputPixelColor.g + inputPixelColor.b) / 3.0;
		inputPixelColor = (val >= blackThresh) ? inputPixelColor : feedbackLevel * feedbackPixelColor;
		inputPixelColor.a = inputPixelColor.a + feedbackPixelColor.a * feedbackLevel;
	}
	else if (blendMode == 2)	{
		//	apply the alpha to the input pixel as this happens
		inputPixelColor.rgb = inputPixelColor.a * inputPixelColor.rgb + (1.0 - inputPixelColor.a) * feedbackLevel * feedbackPixelColor.rgb;
		inputPixelColor.a = inputPixelColor.a + feedbackPixelColor.a * feedbackLevel;
	}
	else if (blendMode == 3)	{
		inputPixelColor.rgb = max(inputPixelColor.a * inputPixelColor.rgb, feedbackLevel * feedbackPixelColor.rgb);
		inputPixelColor.a = inputPixelColor.a + feedbackPixelColor.a * feedbackLevel;
	}
	else if (blendMode == 4)	{
		float		val = feedbackPixelColor.a * (feedbackPixelColor.r + feedbackPixelColor.g + feedbackPixelColor.b) / 3.0;
		inputPixelColor = (val < blackThresh) ? inputPixelColor.a * inputPixelColor : feedbackLevel * feedbackPixelColor;
		inputPixelColor.a = inputPixelColor.a + feedbackPixelColor.a * feedbackLevel;
	}
	else if (blendMode == 5)	{
		//	apply the alpha to the input pixel as this happens
		inputPixelColor.rgb = (1.0-feedbackPixelColor.a) * inputPixelColor.a * inputPixelColor.rgb + feedbackLevel * feedbackPixelColor.rgb;
		inputPixelColor.a = inputPixelColor.a + feedbackPixelColor.a * feedbackLevel;
	}
	
	gl_FragColor = inputPixelColor;
}
