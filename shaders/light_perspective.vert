#version 330 core

layout (location = 0) in vec3 position;
layout (location = 1) in vec3 normal;
layout (location = 2) in vec2 texCoord;

out vec2 fragTexCoord;
out vec3 fragNormal;
out vec3 fragViewDir;

uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;

void main()
{
    // Transform position, normal, and view direction to eye space
    vec4 viewPos = view * model * vec4(position, 1.0);
    gl_Position = projection * viewPos;
    
    vec4 viewNormal = transpose(inverse(view * model)) * vec4(normal, 0.0);
    fragNormal = normalize(viewNormal.xyz);
    
    vec3 viewDir = normalize(viewPos.xyz);
    fragViewDir = viewDir;

    fragTexCoord = texCoord;
}
