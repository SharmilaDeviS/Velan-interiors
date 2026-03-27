import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { SlicePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Common } from './shared/common/common';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule, SlicePipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('velan-interior');

  showFullText = false;
  isMenuOpen = false;
  aboutText: string = `At Velan Architects and Construction, we believe architecture is more than structures —
  it is the art of shaping environments that inspire, endure, and elevate everyday living.
  With a commitment to precision, innovation, and uncompromising quality, we deliver thoughtfully
  designed spaces that stand the test of time. From concept to completion, our team integrates
  architectural excellence with seamless construction execution, ensuring every project reflects
  refined aesthetics, structural integrity, and meticulous attention to detail. We partner closely
  with our clients to transform vision into reality — crafting residential and commercial spaces
  defined by sophistication, functionality, and lasting value.`; // long text

  feedbackList = [
    {
      name: 'Mrs. Iswarya, Pallavaram',
      topic: 'Space Optimization for Home Bakery Setup',
      feedback:
        'We are extremely happy with the modular kitchen, TV unit, and the overall space planning done by Velan Interiors. Our kitchen had space constraints, but with their architectural guidance, they smartly designed the layout to accommodate our home bakery setup, including OTG and oven placement. The yellow and beige theme looks elegant and vibrant, and the high-gloss finish adds a premium feel. Every detail is thoughtfully designed, making the space both beautiful and highly functional for daily use. The entire process was smooth, well-managed, and delivered exactly as promised. We highly recommend their work.',
      architect: 'Kirthika',
      co_ordination: 'Sinduja',
      showFull: false,
    },
    {
      name: 'Mr. Venkat, Keelakattalai',
      topic: 'A Complete Home Transformation ',
      feedback:
        '“Velan Interiors delivered a high standard of workmanship across our home. The material quality, finishing precision, and overall detailing are clearly visible in every element—from the kitchen to the wardrobes. The grey and blue palette paired with the beige glossy finish has been executed with a refined, contemporary touch that elevates the overall space. What stood out the most was their professionalism and service approach. The team was proactive, transparent, and well-organized throughout the project. Coordination was seamless, timelines were respected, and every requirement was handled with care. The final outcome reflects both durability and thoughtful design, making it a great long-term investment for our home.',
      architect: 'Kirthika',
      co_ordination: 'Sinduja',
      showFull: false,
    },
    {
      name: 'Mrs. Anusha, Nanganallur',
      topic: 'Expert Takeover & Seamless Completion',
      feedback:
        'We approached Velan Interiors & Architects to take over our incomplete project, and it was the best decision we made. The team quickly understood the challenges, rectified previous issues, and delivered a clean, well-finished space. Architect Kirthika’s design inputs brought clarity and elegance, while Sinduja ensured smooth coordination throughout. We truly appreciate the team’s dedication and support in completing our home.',
      architect: 'Kirthika',
      co_ordination: 'Sinduja',
      showFull: false,
    },
    {
      name: 'John Smith',
      topic: 'ABC Co.',
      feedback:
        'Working with Velan Architecture and Construction was a fantastic experience. Highly recommended.',
      architect: 'Kirthika',
      co_ordination: 'Sinduja',
      showFull: true,
    },
    {
      name: 'Jane Doe',
      topic: 'XYZ Corp.',
      feedback:
        'The team at Velan Architecture and Construction took my vision and turned it into a reality. Truly impressed with the end result.',
      architect: 'Kirthika',
      co_ordination: 'Sinduja',
      showFull: true,
    },
    {
      name: 'Bob Johnson',
      topic: 'EFG Ltd.',
      feedback:
        "I couldn't have asked for a better team to work on my home renovation project. Their attention to detail and commitment to quality shines through.",
      architect: 'Kirthika',
      co_ordination: 'Sinduja',
      showFull: true,
    },
  ];
  currentIndex = 0;
  constructor(private dialog: MatDialog) {}
  toggleText() {
    this.showFullText = !this.showFullText;
  }
  toggleFeedback(item: any) {
    item.showFull = !item.showFull;
  }

  scrollTo(sectionId: string) {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  scrollToMenu(sectionId: string) {
    this.isMenuOpen = false; // Close menu after clicking a link
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  get itemsToShow(): number {
    return window.innerWidth <= 992 ? 1 : 3;
  }

  // Calculate the percentage to move based on view
  get stepPercentage(): number {
    return 100 / this.itemsToShow;
  }

  nextSlide() {
    // Prevent sliding past the last available group
    if (this.currentIndex < this.feedbackList.length - this.itemsToShow) {
      this.currentIndex++;
    }
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  get transformStyle() {
    return `translateX(-${this.currentIndex * this.stepPercentage}%)`;
  }
  getConsulation() {
    this.dialog.open(Common, {
      width: '480px',
      maxWidth: '95vw',
      panelClass: 'modern-dialog',
      disableClose: true
    });
  }
}
