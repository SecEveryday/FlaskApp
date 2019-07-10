#!/usr/bin/env python
# coding: utf-8

# In[62]:


import requests
# If you are using a Jupyter notebook, uncomment the following line.
# %matplotlib inline
#import matplotlib.pyplot as plt
from PIL import Image
from io import BytesIO
import sys
old_stdout = sys.stdout
log_file = open("message.log","a")

sys.stdout = log_file
sys.stderr = log_file
# Replace <Subscription Key> with your valid subscription key.
def execute():
    subscription_key = "b438bb34e3a144508eb427e71fadc72b"
    assert subscription_key

    # You must use the same region in your REST call as you used to get your
    # subscription keys. For example, if you got your subscription keys from
    # westus, replace "westcentralus" in the URI below with "westus".
    #
    # Free trial subscription keys are generated in the "westcentralus" region.
    # If you use a free trial subscription key, you shouldn't need to change
    # this region.
    vision_base_url = "https://ocrprocesserflaskapp.cognitiveservices.azure.com/vision/v2.0/"

    analyze_url = vision_base_url + "ocr"

    # Set image_path to the local path of an image that you want to analyze.
    image_path = "uploads/testocr.jpg"

    # Read the image into a byte array
    image_data = open(image_path, "rb").read()
    headers = {'Ocp-Apim-Subscription-Key': subscription_key,
               'Content-Type': 'application/octet-stream'}
    params = {
        # Request parameters
        'language': 'en',
        'detectOrientation ': 'true',
    }
    response = requests.post(
        analyze_url, headers=headers, params=params, data=image_data)
    response.raise_for_status()

    # The 'analysis' object contains various fields that describe the image. The most
    # relevant caption for the image is obtained from the 'description' property.
    analysis = response.json()
    print(analysis)
    print(type(analysis["regions"][0]["lines"]))


    # In[63]:


    image_caption = ""
    for j in range(0,len(analysis["regions"][0]["lines"])):
        for i in range(0,len(analysis["regions"][0]["lines"][j]["words"])):
           # print("I is",i)
            #print("J is",j)
            #print(image_caption)
            image_caption += " " +  str(analysis["regions"][0]["lines"][j]["words"][i]["text"].capitalize())
        image_caption += "\n"
        
    print(len(analysis["regions"][0]["lines"]))

    print(image_caption)
    return image_caption
# Display the image and overlay it with the caption.
#image = Image.open(BytesIO(image_data))
#plt.imshow(image)
#plt.axis("off")
#_ = plt.title(image_caption, size="x-large", y=-0.1)


# In[ ]:




