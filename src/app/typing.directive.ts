import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[inputTyping]'
})
export class TypingDirective {

  inputTimer?:any;
  @Input() inputInterval?: number = 100;

  @Output() run = new EventEmitter<void>();
  @Output() finish = new EventEmitter<void>();

  constructor(public el:ElementRef) {
    console.log({ inputInterval: this.inputInterval })
  }


  @HostListener("keydown",['$event'])
  @HostListener("keyup",['$event'])
  onType(e: Event):void{
    const tping=()=>{
      this.run.emit();
    };

    const tpfinished=()=>{
      this.finish.emit();
    };

    if(e.type==="keyup")
    {
      if((e as any).key!=="Backspace") tping();
      clearTimeout(this.inputTimer);
      this.inputTimer=setTimeout(tpfinished,this.inputInterval);
    }
    else if(e.type==="keydown")
    {
      clearTimeout(this.inputTimer);
    }
  }

}
