// Import the Cloudinary class.
import { Cloudinary } from "@cloudinary/url-gen";
// Import any actions required for transformations.
import {fill} from "@cloudinary/url-gen/actions/resize";

// Create a Cloudinary instance and set your cloud name.
const cld = new Cloudinary({
  cloud: {
    cloudName: 'demo'
  }
});
// Instantiate a CloudinaryImage object for the image with the public ID, 'docs/models'.
const myImage = cld.image('docs/models'); 

// Resize to 250 x 250 pixels using the 'fill' crop mode.
myImage.resize(fill().width(250).height(250));

// Render the image in an 'img' element.
const imgElement = document.createElement('img');
document.body.appendChild(imgElement);
imgElement.src = myImage.toURL();