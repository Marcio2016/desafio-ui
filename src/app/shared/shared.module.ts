import { DialogDeleteComponent } from './dialog/dialog-delete/dialog-delete.component';
import { MessageService } from './message/message.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [ DialogDeleteComponent ],
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [ MessageService ],
  exports: [ DialogDeleteComponent ]
})
export class SharedModule { }
