#version 330 core

in vec2 fragTexCoord;
in vec3 fragNormal;
in vec3 fragViewDir;

out vec4 fragColor;

uniform sampler2D ourTexture;

// Phong lighting parameters
const vec3 lightPos = vec3(0.0, 10.0, 0.0);
const vec3 lightColor = vec3(1.0, 1.0, 1.0);
const vec3 ambientColor = vec3(0.1, 0.1, 0.1);
const float shininess = 32.0;

void main()
{
    // Ambient
    vec3 ambient = ambientColor * texture(ourTexture, fragTexCoord).rgb;
    
    // Diffuse
    vec3 lightDir = normalize(lightPos - fragViewDir);
    float diff = max(dot(fragNormal, lightDir), 0.0);
    vec3 diffuse = lightColor * diff * texture(ourTexture, fragTexCoord).rgb;
    
    // Specular
    vec3 reflectDir = reflect(-lightDir, fragNormal);
    vec3 viewDir = normalize(-fragViewDir);
    float spec = pow(max(dot(reflectDir, viewDir), 0.0), shininess);
    vec3 specular = lightColor * spec;
    
    // Final color
    vec3 result = ambient + diffuse + specular;
    fragColor = vec4(result, 1.0);
}
