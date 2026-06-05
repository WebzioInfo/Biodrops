import cv2

img = cv2.imread(r"d:\Webzio\Biodrops\public\bqms_images\page0_img1.jpeg")
h, w = img.shape[:2]

def bgr_to_hex(bgr):
    return "#{:02x}{:02x}{:02x}".format(bgr[2], bgr[1], bgr[0])

print("Top Left:", bgr_to_hex(img[10, 10]))
print("Bottom Right:", bgr_to_hex(img[h-10, w-10]))
print("Top Right:", bgr_to_hex(img[10, w-10]))
print("Bottom Left:", bgr_to_hex(img[h-10, 10]))
