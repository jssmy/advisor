import { Injectable } from "@angular/core";
import { Form, FormControl, FormGroup, Validators } from "@angular/forms";

@Injectable({
    'providedIn': 'root'
})
export class FormStationPresenter {

    public form: FormGroup;
    public rucControl?: FormControl;
    public nameControl?: FormControl;
    public addressControl?: FormControl;
    public departmentControl?: FormControl;
    public provinceControl?: FormControl;
    public districtControl?: FormControl;
    public imageControl?: FormControl;


    constructor() {
        this.rucControl = new FormControl('', [Validators.required]);
        this.nameControl = new FormControl('', [Validators.required]);;
        this.addressControl = new FormControl('', [Validators.required]);
        this.departmentControl = new FormControl('', [Validators.required]);
        this.provinceControl = new FormControl('', [Validators.required]);
        this.districtControl = new FormControl('', [Validators.required]);
        this.imageControl = new FormControl('', [Validators.required]);

        this.form = new FormGroup(
            {
                rucControl: this.rucControl,
                nameControl: this.nameControl,
                addressControl: this.addressControl,
                departmentControl: this.departmentControl,
                provinceControl: this.departmentControl,
                districtControl: this.districtControl,
                imageControl: this.imageControl
            }
        );

    }

    public init() {
        this.rucControl?.setValue('');
        this.nameControl?.setValue('');
        this.addressControl?.setValue('');
    }

    public isValidForm(): boolean {
        return !!this.form?.valid;
    }



}