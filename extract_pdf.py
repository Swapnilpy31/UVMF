from pdfminer.high_level import extract_text
import sys

text = extract_text('UVMF_Profile.pdf')
with open('pdf_content.txt', 'w', encoding='utf-8') as f:
    f.write(text)
print('Done - saved to pdf_content.txt')
