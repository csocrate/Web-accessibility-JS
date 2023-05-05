class PhotographerApp {
  constructor() {
    this.dataApi          = new DataApi("/data/photographers.json")
    this.photographerPage = new PhotographerPage()
  }

  async init() {
    const photographersData = await this.dataApi.photographersFetch()
    const MediaData         = await this.dataApi.mediaFetch()

    Promise.all([
      photographersData,
      MediaData
    ]).then((values)=> {

      const contactForm = new ContactForm()
      contactForm.init()

      const params         = (new URL(document.location)).searchParams
      const photographerId = params.get("id")

      values[0]
        .map(photographer => new PhotographerFactory(photographer, "photographer"))
        .filter(photographer => photographer.id == photographerId)
        .forEach(photographer => {

          const banner             = new PhotographerBanner(photographer)
          const photographerBanner = banner.createPhotographerBanner()
          this.photographerPage.displayPhotographerData(photographerBanner)
    
          const widget             = new PhotographerWidget(photographer)
          const photographerWidget = widget.createPhotographerWidget()
          this.photographerPage.displayPhotograherDataWidget(photographerWidget)
    
          const form               = new ContactForm(photographer)
          const photographerName   = form.createPhotographerName()
          photographerName
        })
  
      values[1]
        .map(media => new PhotographerFactory(media, "media"))
        .filter(media => media.photographerId == photographerId)
        .forEach(media => {

          const portfolio      = new MediaPortfolio(media)
          const mediaPortfolio = portfolio.createMediaPortfolio()
          this.photographerPage.displayMediaData(mediaPortfolio)
    
          const lightbox       = new MediaLightbox(media)
          const mediaLightbox  = lightbox.createMediaLightbox()
          this.photographerPage.displayMediaDataSlideshow(mediaLightbox)
        })
  
      const medialightbox = new MediaLightbox()
      medialightbox.init()
    })
  }
}
const photographerApp = new PhotographerApp()
photographerApp.init()