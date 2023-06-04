class SelectBoxes {
  constructor() {
    this.$select      = document.querySelector('.select-native');
    this.$options     = Array.from(document.getElementsByTagName('option'));

    this.init();
  }

  createArrowIcon() {
    const arrow = document.createElement('div');
    arrow.classList.add('select-arrow');

    const arrowLeft  = document.createElement('span');
    const arrowRight = document.createElement('span');
    
    arrow.appendChild(arrowLeft);
    arrow.appendChild(arrowRight);

    return arrow;
  }

  addArrowToNativeSelect() {
    const selectBoxesContainer = document.querySelector('.filter-bar > div')
    const arrow                = this.createArrowIcon();
    arrow.setAttribute('aria-hidden', 'true');

    selectBoxesContainer.prepend(arrow);
  }

  createCustomSelect() {
    const customSelect = document.createElement('div');
    customSelect.classList.add('select-custom');
    customSelect.setAttribute('aria-hidden', 'true');

    return customSelect;
  }

  createSelectedCustomOption() {
    const selectedCustomOption = document.createElement('div');
    selectedCustomOption.classList.add('selected_custom-option');

    const arrow = this.createArrowIcon();
    selectedCustomOption.appendChild(arrow);

    return selectedCustomOption;
  }

  createCustomOptions() {
    const customOptions = document.createElement('div');
    customOptions.classList.add('custom-options');

    for (let i = 0; i < this.$options.length; i++) {
      const option = document.createElement('div');
      customOptions.appendChild(option)
    }

    return customOptions;
  }

  displayCustomSelect() {
    const selectedCustomOption = this.createSelectedCustomOption();
    const customOptions        = this.createCustomOptions();
    const customSelect         = this.createCustomSelect();
    const selectBoxesContainer = document.querySelector('.filter-bar > div')

    customSelect.appendChild(selectedCustomOption);
    customSelect.appendChild(customOptions);
    selectBoxesContainer.appendChild(customSelect);
  }

  setselectedCustomOption() {
    const selectedCustomOption = document.querySelector('.selected_custom-option');
    const index                = this.$select.selectedIndex;
    const selectedNativeOption = this.$select.options[index];
        
    selectedCustomOption.innerHTML += selectedNativeOption.textContent;
  }

  setCustomOptions() {
    const customOptions = Array.from(document.querySelectorAll('.custom-options div'));

    // Empty array to push all index of customOptions array on it
    const indexes = [];

    customOptions.forEach( (optionTemplate, index) => {
      if (this.$options.length >= index ) {
        optionTemplate.innerHTML += this.$options[index].textContent;
      }

      indexes.push(index);
    })

    const nativeSelectedIndex = (el) => el === this.$select.selectedIndex;

    const customSelectedIndex = indexes.findIndex(nativeSelectedIndex);
    customOptions[customSelectedIndex].classList.add('selected-hidden');
  }

  init() {
    this.displayCustomSelect();
    this.setselectedCustomOption();
    this.setCustomOptions();
    this.addArrowToNativeSelect();
  }
}