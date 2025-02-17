import {
  Component,
} from "@angular/core";
import { RouterModule } from "@angular/router";
import { SplitterModule } from 'primeng/splitter';
import { ToolbarModule } from 'primeng/toolbar';
import { PanelMenuComponent } from "./shared/ui/panel-menu/panel-menu.component";
import { CartComponent } from "./cart/cart.component";
import { CartStore } from "./core/stores/cart.store";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  standalone: true,
  imports: [RouterModule, SplitterModule, ToolbarModule, PanelMenuComponent, CartComponent],
  providers: [CartStore]
})
export class AppComponent {
  title = "ALTEN SHOP";
  visible = false;

  openCart() {
    this.visible = true;
  }
}
