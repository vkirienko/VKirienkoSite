import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faGlobe, faAddressCard, faHeart, faStar } from '@fortawesome/free-solid-svg-icons'
import { faWindows, faGithub } from '@fortawesome/free-brands-svg-icons';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ErrorHandlerService } from './core/services/error-handler.service';
import { LoggingService } from './core/services/logging.service';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
  ],
  providers: [
    LoggingService,
    { provide: ErrorHandler, useClass: ErrorHandlerService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faAddressCard);
    library.addIcons(faGlobe);
    library.addIcons(faHeart);
    library.addIcons(faStar);
    library.addIcons(faWindows);
    library.addIcons(faGithub);
  }
}
