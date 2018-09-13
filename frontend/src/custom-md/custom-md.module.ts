import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatIconRegistry,
    MatInputModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTabsModule,
    MATERIAL_COMPATIBILITY_MODE,
    MatTableModule,
    MatSelectModule
} from '@angular/material';



@NgModule({
    imports: [
        CommonModule,
        MatSlideToggleModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatSidenavModule,
        MatCardModule,
        MatListModule,
        MatButtonModule,
        MatIconModule,
        MatTabsModule,
        MatSnackBarModule,
        //MATERIAL_COMPATIBILITY_MODE,
        MatTableModule,
        MatSelectModule
    ],
    exports: [
        MatSlideToggleModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatSidenavModule,
        MatCardModule,
        MatListModule,
        MatButtonModule,
        MatIconModule,
        MatTabsModule,
        MatSnackBarModule,
        //MATERIAL_COMPATIBILITY_MODE,
        MatTableModule,
        MatSelectModule],
    declarations: [],
    providers: [MatIconRegistry]
})
export class CustomMatModule {
}
