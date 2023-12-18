import {Component, OnInit} from '@angular/core';
import {TableModule} from "primeng/table";
import {Link} from "../../interfaces/link";
import {LinkService} from "../../services/link.service";
import {InputSwitchModule} from 'primeng/inputswitch';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-links-list',
  standalone: true,
  imports: [
    TableModule,
    InputSwitchModule,
    FormsModule
  ],
  templateUrl: './links-list.component.html',
})
export class LinksListComponent implements OnInit {
  links: Link[];

  constructor(private service: LinkService) {
    this.links = [];
  }

  ngOnInit(): void {
    this.service.getAllLinks().subscribe({
      next: (value: Link[]) => {
        this.links = value;
      }
    })
  }

  setLinkAsFavorite(id: bigint, favorite: boolean) {
    this.service.setLinkFavorite(id, favorite).subscribe();
  }
}
