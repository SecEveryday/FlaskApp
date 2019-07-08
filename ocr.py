try:
    from PIL import Image
except ImportError:
    import Image
import pytesseract
def execute():
    return pytesseract.image_to_string(Image.open('uploads/testocr.png'))
