%%% Radon Transform and Inverse Radon Transform

% Angle spacing for reconstruction
th=0:30:179;

% Generate base image of 0s
base_image = zeros(1025, 1025);

% Thin border circle generation
for theta=0.001:0.001:360
    for radius=110:111 
        base_image(513+floor(radius*cosd(theta)):513+ceil(radius*cosd(theta)),...
            513+floor(radius*sind(theta)):513+ceil(radius*sind(theta)))=1;   
    end
    
end

radon_image = radon(base_image,th);
iradon_image = iradon(radon_image, th, 'None');

% Show image
imshow(iradon_image, [])