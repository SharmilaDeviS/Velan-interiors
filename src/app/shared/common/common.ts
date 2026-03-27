import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-common',
  imports: [
    MatDialogModule, MatButtonModule,
    MatFormFieldModule, MatInputModule, MatSelectModule,
    MatButtonToggleModule, MatCheckboxModule, MatIconModule,
    ReactiveFormsModule, CommonModule, MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './common.html',
  styleUrl: './common.css',
})
export class Common {
  districts: string[] = [
    "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", 
    "Dharmapuri", "Dindigul", "Erode", "Kallakurichi", "Kancheepuram", 
    "Kanniyakumari", "Karur", "Krishnagiri", "Madurai", "Mayiladuthurai", 
    "Nagapattinam", "Namakkal", "Perambalur", "Pudukkottai", "Ramanathapuram", 
    "Ranipet", "Salem", "Sivaganga", "Tenkasi", "Thanjavur", "The Nilgiris", 
    "Theni", "Thiruvallur", "Thiruvarur", "Thoothukudi", "Tiruchirappalli", 
    "Tirunelveli", "Tirupathur", "Tiruppur", "Tiruvannamalai", "Vellore", 
    "Viluppuram", "Virudhunagar","Bangalore"
  ];

  private ownerWhatsApp = '+919791104985';
  consultationForm: FormGroup;
  private _snackBar = inject(MatSnackBar);
  private apiUrl = 'https://sharmi-backend-hub.onrender.com';  // api url for production
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<Common>,
    private http: HttpClient
  ) {
    this.consultationForm = this.fb.group({
      propertyType: ['', Validators.required],
      name: ['', Validators.required],
      location: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      whatsappConsent: [true]
    });
  }

  onlyNumbers(event: KeyboardEvent) {
    const pattern = /[0-9]/;
    if (!pattern.test(String.fromCharCode(event.charCode))) {
      event.preventDefault();
    }
  }

  onInputChange(event: any) {
    event.target.value = event.target.value.replace(/[^0-9]/g, '');
  }

  sendToWhatsApp() {
    if (this.consultationForm.valid) {
      const data = this.consultationForm.value;
      console.log('data..', data);

      if (data.whatsappConsent) {
        // WhatsApp flow
        const message = `*New Lead from Velan Website*%0A` +
                        `------------------------------%0A` +
                        `*Name:* ${data.name}%0A` +
                        `*Phone:* 91${data.phone}%0A` +
                        `*Property:* ${data.propertyType}%0A` +
                        `*Location:* ${data.location}%0A` +
                        `*WhatsApp Updates:* Yes`;

        const url = `https://wa.me/${this.ownerWhatsApp}?text=${message}`;
        window.open(url, '_blank');
        this.dialogRef.close();

      } else {
        // Email flow → call backend
        // http://localhost:3000/velan-contact
        this.http.post(this.apiUrl + '/velan-contact', data).subscribe(
          res => {
            console.log('Email sent successfully', res);
            this.openSnackBar('Message sent successfully!', 'Close');
            this.dialogRef.close();
          },
          err => {
            console.error('Error sending email', err)
            this.openSnackBar('Error sending message. Please try again.', 'Close');
          }

        );
      }
    }
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 4000 });
  }
}
