import os
from reportlab.lib.pagesizes import letter, landscape
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, PageBreak, KeepTogether
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch

def build_pdf_calendar(output_path):
    # Setup document in Landscape, Letter size
    # Width: 11 inches (792 points), Height: 8.5 inches (612 points)
    # Margins: 0.4 inches (28.8 points) to maximize grid space
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
    
    # Define custom styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=18,
        leading=22,
        textColor=colors.HexColor('#0f172a'), # slate-900
        alignment=0 # Left
    )
    
    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=14,
        textColor=colors.HexColor('#475569'), # slate-600
        alignment=0 # Left
    )
    
    note_heading_style = ParagraphStyle(
        'NoteHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=10,
        textColor=colors.HexColor('#1e293b'),
    )
    
    note_body_style = ParagraphStyle(
        'NoteBody',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7,
        leading=8.5,
        textColor=colors.HexColor('#475569'),
    )
    
    legend_style = ParagraphStyle(
        'LegendText',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=10,
        textColor=colors.HexColor('#0f172a'),
    )

    day_num_style = ParagraphStyle(
        'DayNum',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=11,
        textColor=colors.HexColor('#1e293b'),
    )
    
    event_coop_style = ParagraphStyle(
        'EventCoop',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=6.5,
        leading=7.5,
        textColor=colors.HexColor('#0d9488'), # teal-600
    )
    
    event_trip_style = ParagraphStyle(
        'EventTrip',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=6.5,
        leading=7.5,
        textColor=colors.HexColor('#e11d48'), # rose-600
    )
    
    event_tuition_style = ParagraphStyle(
        'EventTuition',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=6.5,
        leading=7.5,
        textColor=colors.HexColor('#b45309'), # amber-700
    )

    # 1. September 2026 Data
    sept_events = {
        1: [("Kendall: Get to Know Me", "coop")],
        3: [("Westchester: About Me", "coop")],
        7: [("Field Trip Funds Due", "tuition")],
        8: [("Kendall: The Community", "coop")],
        10: [("Westchester: 5 Senses", "coop")],
        11: [("Salvatore Park Picnic (11am)", "fieldtrip")],
        15: [("Kendall: Entrepreneurship", "coop"), ("October Tuition Due", "tuition")],
        16: [("DIY Squishy Party (11:30am)", "fieldtrip")],
        17: [("Westchester: My Body", "coop")],
        22: [("Kendall: Geography", "coop")],
        24: [("Westchester: Germs & Nutrition", "coop")],
        25: [("Top Golf Field Trip (12:15pm)", "fieldtrip")],
        29: [("M&H Merge Day (12pm)", "fieldtrip")],
    }
    
    # 2. October 2026 Data
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
        27: [("Kendall: Gacavi Farm Day", "coop")],
        29: [("Westchester: Toy Story Day", "fieldtrip")],
    }

    story = []
    
    # Function to create grid for a month
    def make_month_table(month_key, start_day_index, total_days, events_dict, header_bg_color):
        headers = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
        header_row = [
            Paragraph(f"<font color='white'><b>{h}</b></font>", ParagraphStyle('H', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=8, alignment=1))
            for h in headers
        ]
        
        table_data = [header_row]
        cells = []
        
        # Pre-month empty days
        for _ in range(start_day_index):
            cells.append("")
            
        # Actual calendar days
        for d in range(1, total_days + 1):
            cell_elements = []
            # Day number row
            cell_elements.append(Paragraph(f"<b>{d}</b>", day_num_style))
            cell_elements.append(Spacer(1, 2))
            
            # Events list
            if d in events_dict:
                for label, ev_type in events_dict[d]:
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
            
        # Post-month empty padding
        while len(cells) % 7 != 0:
            cells.append("")
            
        # Grid layout (7 cells per row)
        for i in range(0, len(cells), 7):
            table_data.append(cells[i:i+7])
            
        col_width = 105.0 # 7 cells x 105 points = 735 points (approx 10.2 inches)
        row_heights = [18] + [62] * (len(table_data) - 1) # Header 18pt, Rows 62pt (total ~330pt)
        
        t = Table(table_data, colWidths=[col_width]*7, rowHeights=row_heights)
        t.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,0), header_bg_color),
            ('ALIGN', (0,0), (-1,0), 'CENTER'),
            ('VALIGN', (0,0), (-1,-1), 'TOP'),
            ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#cbd5e1')), # slate-300 lines
            ('TOPPADDING', (0,0), (-1,-1), 3),
            ('BOTTOMPADDING', (0,0), (-1,-1), 3),
            ('LEFTPADDING', (0,0), (-1,-1), 4),
            ('RIGHTPADDING', (0,0), (-1,-1), 4),
        ]))
        return t

    # ------------------ PAGE 1: September 2026 ------------------
    # Header Title
    title_table_data = [
        [
            Paragraph("<b>PLAYFUL ACADEMICS CO OP HUB</b>", title_style),
            Paragraph("<b>🗓️ SEPTEMBER 2026</b>", ParagraphStyle('SeptTitle', parent=title_style, alignment=2, textColor=colors.HexColor('#0d9488')))
        ],
        [
            Paragraph("Where Learning Comes Alive! • Contact Fame via WhatsApp", subtitle_style),
            Paragraph("⚠️ <i>Reminder: Complete all forms before attending co op</i>", ParagraphStyle('FormsRem', parent=subtitle_style, alignment=2, textColor=colors.HexColor('#dc2626')))
        ]
    ]
    title_table = Table(title_table_data, colWidths=[367.0, 367.0])
    title_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(title_table)
    story.append(Spacer(1, 10))
    
    # September Grid (starts on Tuesday = index 2, 30 days)
    sept_table = make_month_table("september", 2, 30, sept_events, colors.HexColor('#0d9488'))
    story.append(sept_table)
    story.append(Spacer(1, 10))
    
    # Legend & Detailed Info Bottom Section
    legend_data = [
        [
            Paragraph("<b>🏫 Weekly Co-Ops</b>", legend_style),
            Paragraph("<b>🎉 Field Trips & Outings (Click on Web to View Details)</b>", legend_style),
            Paragraph("<b>⏰ Deadlines & Tuition</b>", legend_style),
        ],
        [
            Paragraph("<b>Kendall (Tuesdays):</b> Meets 1st, 8th, 15th, 22nd. Sept 29 is our exciting Miami & Homestead Merge Day!<br/><b>Westchester (Thursdays):</b> Meets 3rd, 10th, 17th, 24th exploring 'All About Me & My Body'.", note_body_style),
            Paragraph("<b>Sept 11 (11am):</b> Salvatore Park Picnic Play Date (FREE)<br/><b>Sept 16 (11:30am):</b> DIY Squishy Party ($10/child) at Larry & Penny Park<br/><b>Sept 25 (12:15pm):</b> Top Golf Field Trip ($10/person) in Doral", note_body_style),
            Paragraph("<b>Sept 7:</b> Field Trip funds ($10) strictly due to lock bookings.<br/><b>Sept 15:</b> October Tuition Due ($125). 100% Non-Refundable absolute policy.", note_body_style),
        ]
    ]
    legend_table = Table(legend_data, colWidths=[245.0, 245.0, 245.0])
    legend_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#f8fafc')),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#e2e8f0')),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(legend_table)
    
    # ------------------ PAGE BREAK ------------------
    story.append(PageBreak())
    
    # ------------------ PAGE 2: October 2026 ------------------
    # Header Title (Orange theme for autumn October!)
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
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(oct_title_table)
    story.append(Spacer(1, 10))
    
    # October Grid (starts on Thursday = index 4, 31 days)
    oct_table = make_month_table("october", 4, 31, oct_events, colors.HexColor('#ea580c'))
    story.append(oct_table)
    story.append(Spacer(1, 10))
    
    # October Legend
    oct_legend_data = [
        [
            Paragraph("<b>🏫 Weekly Co-Ops</b>", legend_style),
            Paragraph("<b>🎉 Field Trips & Outings (Click on Web to View Details)</b>", legend_style),
            Paragraph("<b>⏰ Deadlines & Tuition</b>", legend_style),
        ],
        [
            Paragraph("<b>Kendall (Tuesdays):</b> Oct 6 (Perception), Oct 13 (STEM/CA), Oct 20 (Business Study), Oct 27 (Gacavi Farm Day).<br/><b>Westchester (Thursdays):</b> Oct 1 (Helpers), Oct 8 (Fire Stn), Oct 15 (Doctor), Oct 22 (Farm Day), Oct 29 (Toy Story Day!).", note_body_style),
            Paragraph("<b>Oct 8 (12pm):</b> Fire Fighter Station Tour (FREE)<br/><b>Oct 14 (12pm):</b> Sprouts Grocery Field Trip (FREE, strictly max 12 kids)<br/><b>Oct 16 (11am):</b> Grounded Hacienda Outing ($25/child)<br/><b>Oct 29 (All Day):</b> Westchester Toy Story Day ($35 guests)", note_body_style),
            Paragraph("<b>Oct 10:</b> All October Field Trip funds strictly due.<br/><b>Oct 15:</b> November Co-Op Tuition due ($125). 100% Non-Refundable absolute policy.", note_body_style),
        ]
    ]
    oct_legend_table = Table(oct_legend_data, colWidths=[245.0, 245.0, 245.0])
    oct_legend_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#fff7ed')), # light orange tint
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#ffedd5')),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(oct_legend_table)
    
    # Build the document
    doc.build(story)
    print("PDF Calendar Generated Successfully!")

if __name__ == '__main__':
    output_pdf = "/opt/data/workspace/homeschooler/public/playful_academics_fall_2026_calendars.pdf"
    # Create public folder if not exists
    os.makedirs(os.path.dirname(output_pdf), exist_ok=True)
    build_pdf_calendar(output_pdf)
