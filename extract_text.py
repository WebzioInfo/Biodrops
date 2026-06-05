import fitz

pdf_path = r"d:\Webzio\Biodrops\public\Biofix_BQMS_.pdf"
text_out = r"d:\Webzio\Biodrops\pdf_text.txt"

doc = fitz.open(pdf_path)
with open(text_out, "w", encoding="utf-8") as f:
    for page in doc:
        f.write(page.get_text())

doc.close()
