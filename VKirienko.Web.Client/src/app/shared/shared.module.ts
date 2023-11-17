import { NgModule } from '@angular/core';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faGlobe, faAddressCard, faHeart, faStar, faDownload, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'
import { faWindows, faGithub, faLinkedin, faGithubSquare } from '@fortawesome/free-brands-svg-icons';

@NgModule()
export class SharedModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faAddressCard);
    library.addIcons(faGlobe);
    library.addIcons(faHeart);
    library.addIcons(faStar);
    library.addIcons(faWindows);
    library.addIcons(faGithub);
    library.addIcons(faDownload);
    library.addIcons(faEnvelope);
    library.addIcons(faPhone);
    library.addIcons(faLinkedin);
    library.addIcons(faGithubSquare);
  }
}
