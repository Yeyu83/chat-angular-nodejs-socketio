import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  messagesSubscription = new Subscription();

  messages: any[] = [];

  form = new FormGroup({
    message: new FormControl('')
  });

  constructor(
    private _chatService: ChatService
  ) { }

  ngOnInit(): void {
    this.messagesSubscription = this._chatService.getMessages().subscribe((message: any) => {
      this.messages.push(message);
    });
  }

  send() {
    // console.log(this.form.controls.message.value);
    this._chatService.sendMessage(this.form.get('message')?.value);
    this.form.get('message')?.setValue('');
  }

  ngOnDestroy() {
    this.messagesSubscription.unsubscribe();
  }

}
