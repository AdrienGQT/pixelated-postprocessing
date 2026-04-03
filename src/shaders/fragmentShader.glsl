uniform float uColorDepth;
uniform float uGridResolution;
uniform vec2 uResolution;

void mainUv(inout vec2 uv) {
    float gridResolution = uGridResolution;
    float aspect = uResolution.x / uResolution.y;

    uv.x *= aspect;
    uv = floor(uv * gridResolution) / gridResolution;
    uv.x /= aspect;
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec4 color = inputColor;

    color.rgb = floor(color.rgb * uColorDepth) / uColorDepth;

    outputColor = vec4(color.rgb, color.a);
}