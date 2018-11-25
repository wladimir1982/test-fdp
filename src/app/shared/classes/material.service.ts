import {ElementRef} from '@angular/core';

declare var M;

export interface MaterialInstance {
  open?(): void;
  close?(): void;
  destroy?(): void;
}

export class MaterialService {

  static initializeSidenav(ref: ElementRef) {
    M.Sidenav.init(ref.nativeElement, {
      preventScrolling: false,
    });
  }

  static initModal(ref: ElementRef) {
    return M.Modal.init(ref.nativeElement);
  }

  static toast(message: string) {
    M.toast({html: message});
  }
}
