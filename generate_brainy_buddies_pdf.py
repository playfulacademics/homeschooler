"""Brainy Buddies — colorful playful print PDF (2 pages)."""
import os
from reportlab.lib.pagesizes import letter, landscape
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from reportlab.lib.styles import ParagraphStyle
from reportlab.graphics.shapes import Drawing, Rect, String, Circle, Line
from reportlab.graphics.shapes import Polygon
from reportlab.lib.units import inch

BRIGHT = {
    "purple": colors.HexColor("#7c3aed"),
    "pink": colors.HexColor("#ec4899"),
    "orange": colors.HexColor("#f97316"),
    "amber": colors.HexColor("#f59e0b"),
    "yellow": colors.HexColor("#facc15"),
    "green": colors.HexColor("#22c55e"),
    "emerald": colors.HexColor("#10b981"),
    "sky": colors.HexColor("#0ea5e9"),
    "blue": colors.HexColor("#3b82f6"),
    "red": colors.HexColor("#ef4444"),
    "violet": colors.HexColor("#8b5cf6"),
    "dark": colors.HexColor("#1e293b"),
    "slate": colors.HexColor("#475569"),
}


def star_row(c, x, y, n=10, size=9, gap=4, fill=colors.HexColor("#facc15")):
    import math
    for i in range(n):
        cx = x + i * (size + gap)
        # Build a 5-point star polygon manually
        pts = []
        for k in range(10):
            angle = math.pi / 2 + k * math.pi / 5
            r = size if k % 2 == 0 else size * 0.45
            px = cx + r * math.cos(angle)
            py = y + size + r * math.sin(angle)
            pts.extend([px, py])
        s = Polygon(points=pts, fillColor=fill, strokeColor=colors.HexColor("#f59e0b"), strokeWidth=0.8)
        c.add(s)


def confetti_border(c, w, h):
    import random
    random.seed(42)
    palette = [BRIGHT["pink"], BRIGHT["sky"], BRIGHT["green"], BRIGHT["orange"], BRIGHT["violet"], BRIGHT["yellow"]]
    for i in range(60):
        x = random.uniform(6, w - 6)
        y = random.choice([random.uniform(6, 16), random.uniform(h - 16, h - 6)])
        c.saveState()
        c.setFillColor(palette[i % len(palette)])
        c.translate(x, y)
        c.rotate(random.uniform(0, 180))
        c.rect(-2.2, -1.2, 4.4, 2.4, stroke=0, fill=1)
        c.restoreState()


def header_banner(c, w, h, title, subtitle):
    # Rainbow banner
    band_colors = [BRIGHT["red"], BRIGHT["orange"], BRIGHT["yellow"], BRIGHT["green"], BRIGHT["sky"], BRIGHT["violet"], BRIGHT["pink"]]
    band_w = w / len(band_colors)
    for i, col in enumerate(band_colors):
        c.setFillColor(col)
        c.rect(i * band_w, h - 26, band_w + 1, 26, stroke=0, fill=1)
    c.setFillColor(colors.white)
    c.setFont("Helvetica-Bold", 13)
    c.drawCentredString(w / 2, h - 18, "🍎  P L A Y F U L   A C A D E M I C S  🍎")

    # Title
    c.setFillColor(BRIGHT["purple"])
    c.setFont("Helvetica-Bold", 30)
    c.drawCentredString(w / 2, h - 62, title)
    # Title underline squiggle
    c.setStrokeColor(BRIGHT["pink"])
    c.setLineWidth(3)
    y = h - 70
    seg = w / 14.0
    for i in range(14):
        x0 = i * seg
        c.line(x0 + 3, y, x0 + seg / 2, y + 6 if i % 2 == 0 else y - 4)
        c.line(x0 + seg / 2, y + 6 if i % 2 == 0 else y - 4, x0 + seg - 3, y)
    c.setFillColor(BRIGHT["slate"])
    c.setFont("Helvetica-Bold", 14)
    c.drawCentredString(w / 2, h - 90, subtitle)


def footer(c, w, page_label):
    c.setFillColor(BRIGHT["slate"])
    c.setFont("Helvetica-Bold", 7.5)
    c.drawString(30, 20, "Playful Academics LLC · Brainy Buddies · Little Pals. Big Thinking.")
    c.drawRightString(w - 30, 20, page_label)


def build_pdf(path):
    W, H = landscape(letter)  # 792 x 612
    doc = SimpleDocTemplate(path, pagesize=landscape(letter), leftMargin=36, rightMargin=36, topMargin=100, bottomMargin=36)

    styles = get_sample_styles()

    def on_page_one(c, doc_):
        header_banner(c, W, H, "Brainy Buddies", "Little Pals. Big Thinking.  🐾")
        confetti_border(c, W, H)
        footer(c, W, "Page 1 of 2")

    def on_page_two(c, doc_):
        header_banner(c, W, H, "Brainy Buddy Homes", "Every Brainy Buddy needs a cozy place to think!  🏡")
        confetti_border(c, W, H)
        footer(c, W, "Page 2 of 2")

    story = []

    # ---------- PAGE 1 CONTENT: 10-Star Challenge Reward ----------
    kicker = ParagraphStyle("kicker", parent=styles["normal"], fontName="Helvetica-Bold", fontSize=11,
                            textColor=BRIGHT["orange"], alignment=1)
    story.append(Paragraph("⭐  THE 10-STAR CHALLENGE REWARD  ⭐", kicker))
    story.append(Spacer(1, 10))

    steps = [
        ("⭐", "1. Choose a Brainy Buddy", "Pick your favorite plush pal from the Buddy Basket!", BRIGHT["amber"], colors.HexColor("#fef3c7")),
        ("🏠", "2. Pick your little Buddy Home", "Every Buddy needs a cozy place to think and dream.", BRIGHT["sky"], colors.HexColor("#e0f2fe")),
        ("✏️", "3. Name your Buddy", "Give your new best friend a super fun name!", BRIGHT["pink"], colors.HexColor("#fce7f3")),
        ("🎒", "4. Take your Buddy on learning adventures", "Bring your Buddy to co-op, field trips & story time!", BRIGHT["emerald"], colors.HexColor("#d1fae5")),
    ]
    step_rows = []
    for emoji, title, desc, accent, bg in steps:
        cell = Paragraph(
            f"<font size=13><b>{emoji} {title}</b></font><br/>"
            f"<font size=9 color='#475569'>{desc}</font>",
            ParagraphStyle("step", parent=styles["normal"], textColor=BRIGHT["dark"], leading=15)
        )
        step_rows.append([cell])

    step_table = Table(step_rows, colWidths=[500])
    step_style = [
        ("BOX", (0, 0), (-1, -1), 2.5, BRIGHT["purple"]),
        ("INNERGRID", (0, 0), (-1, -1), 1.5, colors.white),
        ("LEFTPADDING", (0, 0), (-1, -1), 14),
        ("RIGHTPADDING", (0, 0), (-1, -1), 14),
        ("TOPPADDING", (0, 0), (-1, -1), 9),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
    ]
    for i, (_, _, _, accent, bg) in enumerate(steps):
        step_style.append(("BACKGROUND", (0, i), (-1, i), bg))
        step_style.append(("LINEBEFORE", (0, i), (0, i), 5, accent))
    step_table.setStyle(TableStyle(step_style))
    story.append(step_table)
    story.append(Spacer(1, 12))

    # Star meter
    d = Drawing(500, 40)
    star_row(d, 60, 12, n=10, size=12, gap=6)
    d.add(String(250, 32, "E A R N   A L L   1 0   S T A R S !", textAnchor="middle",
                 fontName="Helvetica-Bold", fontSize=9, fillColor=BRIGHT["orange"]))
    story.append(d)
    story.append(Spacer(1, 4))

    cutnote = ParagraphStyle("cutnote", parent=styles["normal"], fontName="Helvetica-Bold",
                             fontSize=9, textColor=BRIGHT["pink"], alignment=1)
    story.append(Paragraph("✂️ - - - - - - - - - - - - - - -   CUT  HERE  (MY BRAINY BUDDY CARD BELOW)   - - - - - - - - - - - - - - - ✂️", cutnote))
    story.append(Spacer(1, 8))

    # Cut-out card
    card_title = ParagraphStyle("cardt", parent=styles["normal"], fontName="Helvetica-Bold", fontSize=16,
                                textColor=BRIGHT["purple"], alignment=1)
    card_line = ParagraphStyle("cardl", parent=styles["normal"], fontName="Helvetica-Bold", fontSize=9,
                               textColor=BRIGHT["slate"])
    card = Table([
        [Paragraph("🧸  MY  BRAINY  BUDDY  🧸", card_title)],
        [Paragraph("BUDDY'S NAME:  ________________________________", card_line)],
        [Paragraph("MY NAME:  ______________________________________", card_line)],
        [Paragraph("OUR FAVORITE ADVENTURE:  ______________________", card_line)],
    ], colWidths=[460])
    card.setStyle(TableStyle([
        ("BOX", (0, 0), (-1, -1), 2.5, BRIGHT["pink"]),
        ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#fdf2f8")),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
        ("LEFTPADDING", (0, 0), (-1, -1), 16),
        ("ALIGN", (0, 0), (-1, -1), "CENTER"),
    ]))
    story.append(card)

    # ---------- PAGE BREAK ----------
    story.append(Spacer(1, 1))
    from reportlab.platypus import PageBreak
    story.append(PageBreak())

    # ---------- PAGE 2 CONTENT: Buddy Homes ----------
    homes_intro = ParagraphStyle("hi", parent=styles["normal"], fontName="Helvetica-Bold", fontSize=11,
                                 textColor=BRIGHT["emerald"], alignment=1)
    story.append(Paragraph("🏡  PICK  YOUR  BUDDY'S  COZY  HOME  🏡", homes_intro))
    story.append(Spacer(1, 12))

    homes = [
        ("🏠", "Cozy Cottage", colors.HexColor("#ffedd5")),
        ("🛖", "Tiny Tipi", colors.HexColor("#fef9c3")),
        ("🏰", "Castle Fort", colors.HexColor("#ede9fe")),
        ("⛺", "Camp Tent", colors.HexColor("#dcfce7")),
        ("🚀", "Rocket Pod", colors.HexColor("#e0f2fe")),
        ("🐝", "Bumble Hive", colors.HexColor("#fef08a")),
    ]
    rows = []
    for emoji, name, bg in homes:
        cell = Paragraph(
            f"<font size=20>{emoji}</font><br/><font size=9><b>{name}</b></font>",
            ParagraphStyle("home", parent=styles["normal"], alignment=1, textColor=BRIGHT["dark"], leading=24)
        )
        rows.append([cell])

    grid = Table([rows[0:3], rows[3:6]], colWidths=[160] * 3, rowHeights=[80, 80])
    home_style = [
        ("BOX", (0, 0), (-1, -1), 2.5, BRIGHT["green"]),
        ("INNERGRID", (0, 0), (-1, -1), 2, colors.white),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
    ]
    bgs = [h[2] for h in homes]
    idx = 0
    for r in range(2):
        for col in range(3):
            home_style.append(("BACKGROUND", (col, r), (col, r), bgs[idx]))
            idx += 1
    grid.setStyle(TableStyle(home_style))
    story.append(grid)
    story.append(Spacer(1, 12))

    # Buddy adoption line
    adopt = Paragraph(
        "<font size=10><b>My Buddy's Home is:</b>  ____________________________"
        "&nbsp;&nbsp;&nbsp;&nbsp;<b>Adoption Date:</b>  ______________</font>",
        ParagraphStyle("adopt", parent=styles["normal"], textColor=BRIGHT["dark"], alignment=1)
    )
    adopt_box = Table([[adopt]], colWidths=[500])
    adopt_box.setStyle(TableStyle([
        ("BOX", (0, 0), (-1, -1), 2.5, BRIGHT["orange"]),
        ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#fff7ed")),
        ("TOPPADDING", (0, 0), (-1, -1), 10),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
    ]))
    story.append(adopt_box)
    story.append(Spacer(1, 10))

    # Rule of the buddy
    rule = Paragraph(
        "<font size=10><b>🌟 The Buddy Promise:</b> I will read to my Buddy, take them on adventures, "
        "and keep them safe and cozy. A Brainy Buddy makes thinking twice as fun!</font>",
        ParagraphStyle("rule", parent=styles["normal"], textColor=BRIGHT["dark"], alignment=1, leading=14)
    )
    rule_box = Table([[rule]], colWidths=[500])
    rule_box.setStyle(TableStyle([
        ("BOX", (0, 0), (-1, -1), 2.5, BRIGHT["sky"]),
        ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#e0f2fe")),
        ("TOPPADDING", (0, 0), (-1, -1), 10),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
        ("LEFTPADDING", (0, 0), (-1, -1), 14),
        ("RIGHTPADDING", (0, 0), (-1, -1), 14),
    ]))
    story.append(rule_box)

    doc.build(story, onFirstPage=on_page_one, onLaterPages=on_page_two)
    print("Brainy Buddies playful PDF generated!")


def get_sample_styles():
    from reportlab.lib.styles import getSampleStyleSheet
    base = getSampleStyleSheet()
    return {"normal": base["Normal"], "title": base["Title"]}


if __name__ == "__main__":
    out = "/opt/data/workspace/homeschooler/public/brainy_buddies_playful.pdf"
    os.makedirs(os.path.dirname(out), exist_ok=True)
    build_pdf(out)
