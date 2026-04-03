uniform float uColorDepth;
uniform float uGridResolution;
uniform vec2 uResolution;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    float gridResolution = uGridResolution;

    float aspect = uResolution.x / uResolution.y;

    vec2 squareUv = uv;
    squareUv.x *= aspect;

    vec2 customUv = floor(squareUv * gridResolution) / gridResolution;
    customUv.x /= aspect;

    vec4 color = texture2D(inputBuffer, customUv);

    color.x = floor(color.x * uColorDepth) / uColorDepth;
    color.y = floor(color.y * uColorDepth) / uColorDepth;
    color.z = floor(color.z * uColorDepth) / uColorDepth;

    outputColor = color;
}