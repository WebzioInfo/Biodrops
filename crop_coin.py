import cv2
import numpy as np
import sys

img_path = r"d:\Webzio\Biodrops\public\bqms_images\page0_img1.jpeg"
out_path = r"d:\Webzio\Biodrops\public\bqms_images\bqms_coin.png"

img = cv2.imread(img_path)
if img is None:
    print("Could not read image")
    sys.exit(1)

x, y, r = 899, 1333, 433
print(f"Cropping coin at x={x}, y={y}, r={r}")

mask = np.zeros(img.shape[:2], dtype=np.uint8)
cv2.circle(mask, (x, y), r, (255, 255, 255), -1)

# Crop the image to the bounding box of the circle
y1, y2 = max(0, y-r), min(img.shape[0], y+r)
x1, x2 = max(0, x-r), min(img.shape[1], x+r)

cropped_img = img[y1:y2, x1:x2]
cropped_mask = mask[y1:y2, x1:x2]

# Add alpha channel
b, g, r_ch = cv2.split(cropped_img)
alpha = np.zeros(b.shape, dtype=b.dtype)
alpha[cropped_mask == 255] = 255

rgba = cv2.merge((b, g, r_ch, alpha))
cv2.imwrite(out_path, rgba)
print("Saved coin to bqms_coin.png")
