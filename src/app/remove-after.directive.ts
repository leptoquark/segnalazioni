import { Directive, ElementRef, Input } from '@angular/core';
import { from } from 'rxjs';
import { FormComponent } from './form/form.component';

@Directive({
  selector: '[appRemoveAfter]'
})
export class RemoveAfterDirective {

  constructor(readonly element: ElementRef<HTMLElement>) { }

  @Input()
  appRemoveAfter!: string;


  ngOnInit() {
    setTimeout(() => {
      this.element.nativeElement.remove();
    }, Number(this.appRemoveAfter));
  }

}
