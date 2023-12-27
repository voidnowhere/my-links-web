import {Component, OnInit} from '@angular/core';
import {TableModule} from "primeng/table";
import {Link} from "../../interfaces/link";
import {LinkService} from "../../services/link.service";
import {InputSwitchModule} from 'primeng/inputswitch';
import {FormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {AccordionModule} from "primeng/accordion";
import {DialogModule} from "primeng/dialog";
import {RippleModule} from "primeng/ripple";
import {InputGroupModule} from "primeng/inputgroup";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import {InputTextModule} from "primeng/inputtext";
import {AutoFocusModule} from "primeng/autofocus";
import {ConfirmationService, MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {ConfirmDialogModule} from "primeng/confirmdialog";

@Component({
  selector: 'app-links-list',
  standalone: true,
  imports: [
    TableModule,
    InputSwitchModule,
    FormsModule,
    ButtonModule,
    AccordionModule,
    DialogModule,
    RippleModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    AutoFocusModule,
    ToastModule,
    ConfirmDialogModule,
  ],
  templateUrl: './links-list.component.html',
  providers: [ConfirmationService],
})
export class LinksListComponent implements OnInit {
  links: Link[];
  display = false;
  addedLink : Link;

  constructor(private service: LinkService, private messageService: MessageService, private confirmationService: ConfirmationService) {
    this.links = [];
    this.addedLink = {url : '' , favorite : false};
  }

  fetchAllLinks(): void{
    this.service.getAllLinks().subscribe({
      next: (value: Link[]) => {
        this.links = value;
      }
    })  }

  ngOnInit(): void {
    this.fetchAllLinks();
  }

  setLinkAsFavorite(id: bigint, favorite: boolean) {
    this.service.setLinkFavorite(id, favorite).subscribe();
  }

  addLink() {
    this.service.addLink(this.addedLink).subscribe({
      next: value => {
    this.fetchAllLinks();
    this.display=false;
    this.addedLink.url = '';
    this.addedLink.favorite = false;
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Link has been added' });
      },
      error: err => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error });
      }
    });
  }

  deleteLink(event:Event ,id: bigint) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this link?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",

      accept: () => {
        this.service.deleteLink(id).subscribe({next:value => {
            this.fetchAllLinks();
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'link deleted' });
          }})
      },
    });
  }

  showDialog() {
    this.display=true
  }
}
