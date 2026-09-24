import os
from reportlab.lib.pagesizes import letter, landscape
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, PageBreak
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

def build_pdf_calendar(output_path):
    margin = 28.8
    doc = SimpleDocTemplate(
        output_path,
        pagesize=landscape(letter),
        leftMargin=margin,
        rightMargin=margin,
        topMargin=margin,
        bottomMargin=margin
    )

    styles = getSampleStyleSheet()

    title_style = ParagraphStyle(
        'DocTitle', parent=styles['Normal'],
        fontName='Helvetica-Bold', fontSize=18, leading=22,
        textColor=colors.HexColor('#0f172a'), alignment=0
    )
    subtitle_style = ParagraphStyle(
        'DocSubtitle', parent=styles['Normal'],
        fontName='Helvetica-Bold', fontSize=10, leading=13,
        textColor=colors.HexColor('#475569'), alignment=0
    )
    legend_style = ParagraphStyle(
        'LegendText', parent=styles['Normal'],
        fontName='Helvetica-Bold', fontSize=8, leading=10,
        textColor=colors.HexColor('#0f172a'),
    )
    note_body_style = ParagraphStyle(
        'NoteBody', parent=styles['Normal'],
        fontName='Helvetica', fontSize=7, leading=8.5,
        textColor=colors.HexColor('#475569'),
    )
    day_num_style = ParagraphStyle(
        'DayNum', parent=styles['Normal'],
        fontName='Helvetica-Bold', fontSize=9, leading=11,
        textColor=colors.HexColor('#1e293b'),
    )
    event_coop_style = ParagraphStyle(
        'EventCoop', parent=styles['Normal'],
        fontName='Helvetica-Bold', fontSize=6.5, leading=7.5,
        textColor=colors.HexColor('#4f46e5'),  # indigo-600 (Westchester theme)
    )
    event_trip_style = ParagraphStyle(
        'EventTrip', parent=styles['Normal'],
        fontName='Helvetica-Bold', fontSize=6.5, leading=7.5,
        textColor=colors.HexColor('#c2410c'),  # orange-700
    )
    event_tuition_style = ParagraphStyle(
        'EventTuition', parent=styles['Normal'],
        fontName='Helvetica-Bold', fontSize=6.5, leading=7.5,
        textColor=colors.HexColor('#b45309'),
    )

    # October 2026 Events
    oct_events = {
        1: [("Westchester: Helpers Intro", "coop")],
        6: [("Kendall: Perception & PE", "coop")],
        8: [("Fire Station Tour (12pm)", "fieldtrip")],
        10: [("All Field Trip Funds Due", "tuition")],
        13: [("Kendall: STEM & California", "coop")],
        14: [("Sprouts Field Trip (12pm)", "fieldtrip")],
        15: [("Westchester: Doctor Day", "coop"), ("November Tuition Due", "tuition")],
        16: [("Grounded Hacienda Trip", "fieldtrip")],
        20: [("Kendall: Business Study", "coop")],
        22: [("Westchester: Farm Day", "coop")],
        27: [("Kendall: Gacavi Farm Day", "coop"), ("Westchester: Equestrian Day", "fieldtrip")],
        29: [("Westchester: Toy Story Day", "fieldtrip")],
    }

    story = []

    # ------------------ OCTOBER 2026 PAGE ------------------
    oct_title_data = [
        [
            Paragraph("<b>PLAYFUL ACADEMICS CO OP HUB</b>", title_style),
            Paragraph("<b>🍁 OCTOBER 2026</b>", ParagraphStyle('OctTitle', parent=title_style, alignment=2, textColor=colors.HexColor('#ea580c')))
        ],
        [
            Paragraph("Where Learning Comes Alive! • Contact Fame via WhatsApp", subtitle_style),
            Paragraph("⚠️ <i>Reminder: Complete all forms before attending co op</i>", ParagraphStyle('FormsRemOct', parent=subtitle_style, alignment=2, textColor=colors.HexColor('#dc2626')))
        ]
    ]
    oct_title_table = Table(oct_title_data, colWidths=[367.0, 367.0])
    oct_title_table.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 0),
        ('TOPPADDING', (0, 0), (-1, -1), 0),
    ]))
    story.append(oct_title_table)
    story.append(Spacer(1, 10))

    # October Grid: starts on Thursday (index 4), 31 days
    headers = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
    header_row = [
        Paragraph(f"<font color='white'><b>{h}</b></font>",
                  ParagraphStyle('H', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=8, alignment=1))
        for h in headers
    ]
    table_data = [header_row]
    cells = []
    start_day_index = 4
    total_days = 31

    for _ in range(start_day_index):
        cells.append("")

    for d in range(1, total_days + 1):
        cell_elements = []
        cell_elements.append(Paragraph(f"<b>{d}</b>", day_num_style))
        cell_elements.append(Spacer(1, 2))
        if d in oct_events:
            for label, ev_type in oct_events[d]:
                if ev_type == "coop":
                    style = event_coop_style
                    prefix = "🏫 "
                elif ev_type == "fieldtrip":
                    style = event_trip_style
                    prefix = "🎉 "
                else:
                    style = event_tuition_style
                    prefix = "⏰ "
                cell_elements.append(Paragraph(f"{prefix}{label}", style))
                cell_elements.append(Spacer(1, 1.5))
        cells.append(cell_elements)

    while len(cells) % 7 != 0:
        cells.append("")

    for i in range(0, len(cells), 7):
        table_data.append(cells[i:i + 7])

    col_width = 105.0
    row_heights = [18] + [62] * (len(table_data) - 1)

    oct_table = Table(table_data, colWidths=[col_width] * 7, rowHeights=row_heights)
    oct_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#ea580c')),
        ('ALIGN', (0, 0), (-1, 0), 'CENTER'),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#cbd5e1')),
        ('TOPPADDING', (0, 0), (-1, -1), 3),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
        ('LEFTPADDING', (0, 0), (-1, -1), 4),
        ('RIGHTPADDING', (0, 0), (-1, -1), 4),
    ]))
    story.append(oct_table)
    story.append(Spacer(1, 10))

    # October Legend & Details
    oct_legend_data = [
        [
            Paragraph("<b>🏫 Weekly Co-Ops</b>", legend_style),
            Paragraph("<b>🎉 Field Trips & Special Events</b>", legend_style),
            Paragraph("<b>⏰ Deadlines & Tuition</b>", legend_style),
        ],
        [
            Paragraph(
                "<b>Kendall Leadership (Tuesdays):</b> Oct 6 (Perception & Yarn Art), Oct 13 (California Gold Rush & PE w/ Coach Jose), Oct 20 (Entrepreneurial Study, Electrical Currents & Yarn Turtle), Oct 27 (Gacavi Farm Day).<br/><br/>"
                "<b>Westchester (Thursdays):</b> Oct 1 (Community Helpers — bring 1 water spray bottle), Oct 8 (Fire Day @ Tropical Park, PE 11am, depart 11:45am), Oct 15 (Doctors Day — bring pencil/marker + clipboard), Oct 29 (Farmers Market Day — make your own product to sell!).",
                note_body_style),
            Paragraph(
                "<b>Oct 8 (12:00 PM):</b> Fire Station Tour — 3911 SW 82nd Ave, Miami, FL 33155 (FREE)<br/><br/>"
                "<b>Oct 14 (12:00 PM):</b> Sprouts Field Trip in Kendall (max 12 kids, must RSVP)<br/><br/>"
                "<b>Oct 16 (11:30 AM):</b> Grounded Farm — $25/child (parents & siblings free)<br/><br/>"
                "<b>Oct 27:</b> Equestrian Day at Gacavi — $25/child<br/><br/>"
                "<b>Oct 29:</b> Westchester Toy Story Day (Free members / $35 non-members)",
                note_body_style),
            Paragraph(
                "<b>Oct 10:</b> All Field Trip funds strictly due (Grounded Farm & Equestrian Day). Pay via Cash, Zelle, Apple Pay, or Step Up with our FLEX option.<br/><br/>"
                "<b>Oct 15:</b> November Co-Op Tuition due ($125). 100% Non-Refundable absolute policy.<br/><br/>"
                "<i>Payments: playfulacademics.com</i>",
                note_body_style),
        ]
    ]
    oct_legend_table = Table(oct_legend_data, colWidths=[245.0, 245.0, 245.0])
    oct_legend_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#fff7ed')),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#ffedd5')),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ]))
    story.append(oct_legend_table)

    doc.build(story)
    print("October PDF Calendar Generated Successfully!")


if __name__ == '__main__':
    output_pdf = "/opt/data/workspace/homeschooler/public/playful_academics_october_2026_calendar.pdf"
    os.makedirs(os.path.dirname(output_pdf), exist_ok=True)
    build_pdf_calendar(output_pdf)
