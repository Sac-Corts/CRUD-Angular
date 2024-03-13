import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmpleadoService } from '../services/empleado.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent implements OnInit {
  formEmp: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _empService: EmpleadoService,
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService,
  ) {
    this.formEmp = this._fb.group({
      nombre: '',
      apellido: '',
      email: '',
      genero: '',
    });
  }

  ngOnInit(): void {
    this.formEmp.patchValue(this.data);
  }

  formEnviado() {
    if (this.formEmp.valid) {
      if (this.data) {
        this._empService
          .editarEmpleado(this.data.id, this.formEmp.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Ha sido actualizado');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._empService
        .agregarEmpleado(this.formEmp.value)
        .subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Empleado agregado exitosamente');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}