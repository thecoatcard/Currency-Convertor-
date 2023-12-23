const fromCurrencySelect = document.getElementById('fromCurrency');
    const toCurrencySelect = document.getElementById('toCurrency');
    const amountInput = document.getElementById('amount');
    const resultInput = document.getElementById('result');
    
    async function fetchCurrencies() {
      try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const { rates } = await response.json();
    
        Object.keys(rates).forEach(currency => {
          const option = document.createElement('option');
          option.value = currency;
          option.textContent = currency;
          fromCurrencySelect.appendChild(option.cloneNode(true));
          toCurrencySelect.appendChild(option.cloneNode(true));
        });
    
        setFlagBackground('USD', 'fromFlag');
        setFlagBackground('EUR', 'toFlag');
      } catch (error) {
        console.error('Error fetching currencies:', error);
      }
    }
    function clearFields() {
      amountInput.value = '';
      resultInput.value = '';
      fromCurrencySelect.selectedIndex = 0;
      toCurrencySelect.selectedIndex = 0;
      setFlagBackground('USD', 'fromFlag');
      setFlagBackground('EUR', 'toFlag');
    }
    
    async function convert() {
      const fromCurrency = fromCurrencySelect.value;
      const toCurrency = toCurrencySelect.value;
      const amount = amountInput.value;
    
      try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        const { rates } = await response.json();
    
        const exchangeRate = rates[toCurrency];
        const result = (amount * exchangeRate).toFixed(2);
        resultInput.value = result;
      } catch (error) {
        console.error('Error converting currency:', error);
      }
    
      setFlagBackground(fromCurrency, 'fromFlag');
      setFlagBackground(toCurrency, 'toFlag');
    }
    
    function setFlagBackground(currencyCode, flagElementId) {
      const flagColors = {
        USD: ['#b22234', '#fff', '#3c3b6e'],
        EUR: ['#ffce00', '#ffce00', '#003399'],
        // Add more country codes and their flag colors here...
      };
    
      const colors = flagColors[currencyCode];
      const gradient = `linear-gradient(135deg, ${colors[0]} 0%, ${colors[0]} 30%, ${colors[1]} 30%, ${colors[1]} 70%, ${colors[2]} 70%, ${colors[2]} 100%)`;
      document.getElementById(flagElementId).style.backgroundImage = gradient;
    }
    
    fromCurrencySelect.addEventListener('change', function() {
      setFlagBackground(this.value, 'fromFlag');
    });
    
    toCurrencySelect.addEventListener('change', function() {
      setFlagBackground(this.value, 'toFlag');
    });
    
    fetchCurrencies();