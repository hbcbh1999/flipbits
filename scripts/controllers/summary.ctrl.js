/**
 * Summary Controller
 * Display the final information about the
 * a test run
 */
function SummaryCtrl (retryCallback) {

  this.retryCallback = retryCallback || function () {};
  
  // Start creation
  this.setupTemplate()
}

/**
 * Build template of the controller
 * @return {DOMElement}
 */
SummaryCtrl.prototype.setupTemplate = function () {
  this.resultEl = dom.create('p', 'summary-counter-wrap')
  this.counterDigitEl = dom.create('span');
  this.counterDecimalEl = dom.create('span', 'small');
  var counterWrap = dom.create('p', 'summary-counter-wrap-sub', [this.counterDigitEl, this.counterDecimalEl])
  this.counterEl = dom.create('div', 'summary-counter', [this.resultEl, counterWrap])

  this.detailsPosEl = dom.create('div', 'summary-item pin-pos')
  this.detailsNegEl = dom.create('div', 'summary-item pin-neg')
  this.detailsEl = dom.create('div', 'summary-bloc', [this.detailsPosEl, this.detailsNegEl])

  this.resetEl = dom.create('button', 'summary-item bordered', 'RETRY')
  this.resetEl.addEventListener('click', this.retryCallback)
  this.resetEl.addEventListener('touchend', this.retryCallback)

  var credits = document.getElementById('credits')
  var social = document.getElementById('social')
  credits.classList.add('summary-item', 'bordered')
  social.classList.add('summary-item', 'bordered')
  var bottomline = dom.create('div', 'summary-bloc', [credits, social])

  this.el = dom.create('div', 'summary-ctrl', [
    this.counterEl,
    dom.create('div', '', [this.detailsEl, this.resetEl, bottomline])
  ]);
}

// Actions

/**
 * Reset the controller
 */
SummaryCtrl.prototype.set = function (dotLength, posDots) {
  // Set the counter
  var value = ((posDots / dotLength) * 100).toFixed(2).split('.');

  this.counterDecimalEl.textContent = '.' + value[1] + '%';
  this.counterDigitEl.textContent = value[0];

  this.detailsPosEl.textContent = posDots;
  this.detailsNegEl.textContent = (dotLength - posDots);

  var extraPosDots = posDots - (dotLength/2)
  if (extraPosDots > 0) {
    this.el.classList.add('success')
    this.resultEl.textContent = 'Yas!'
  }
  else if (extraPosDots < 0) {
    this.el.classList.add('fail')
    this.resultEl.textContent = 'Nope.'
  }
  else {
    this.resultEl.textContent = 'Try again'
  }

  this.el.classList.add('ready')
}

SummaryCtrl.prototype.show = function () {
  this.el.style.display = '';
}

SummaryCtrl.prototype.hide = function () {
  this.el.style.display = 'none';
}

SummaryCtrl.prototype.reset = function () {
  this.el.classList.remove('ready')
  this.el.classList.remove('success')
  this.el.classList.remove('fail')

  this.resultEl.textContent = ''
}