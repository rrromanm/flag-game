const generateRandomOptions = (correctOption, allOptions) => {
    const optionsSet = new Set(allOptions);
    optionsSet.delete(correctOption);
  
    const randomOptions = [];
    while (randomOptions.length < 3) {
      const randomOption = Array.from(optionsSet)[
        Math.floor(Math.random() * optionsSet.size)
      ];
      randomOptions.push(randomOption);
      optionsSet.delete(randomOption);
    }
  
    return randomOptions;
  };
  
  const flags = [
    // EUROPE FLAGS
    {
      name: 'Albania',
      image: '../img/europe/albania.png',
      correctOption: 'Albania',
      continent: 'Europe',
    },
    {
        name: 'Andorra',
        image: '../img/europe/andorra.jpg',
        correctOption: 'Andorra',
        continent: 'Europe',
    },
    {
        name: 'Austria',
        image: '../img/europe/austria.jpg',
        correctOption: 'Austria',
        continent: 'Europe',
    },
    {
        name: 'Belarus',
        image: '../img/europe/belarus.jpg',
        correctOption: 'Belarus',
        continent: 'Europe',
    },
    {
        name: 'Bosnia and Herzegovina',
        image: '../img/europe/bosnia-and-herzegovina.jpg',
        correctOption: 'Bosnia and Herzegovina',
        continent: 'Europe',
    },
    {
        name: 'Bulgaria',
        image: '../img/europe/bulgaria.png',
        correctOption: 'Bulgaria',
        continent: 'Europe',
    },
    {
        name: 'Croatia',
        image: '../img/europe/croatia.png',
        correctOption: 'Croatia',
        continent: 'Europe',
    },
    {
        name: 'Czech Republic', 
        image: '../img/europe/czech-republic.png',
        correctOption: 'Czech Republic',
        continent: 'Europe',
    },
    {
        name: 'Denmark',  
        image: '../img/europe/denark.png',
        correctOption: 'Denmark',
        continent: 'Europe',
    },
  ];
  
  flags.forEach((flag) => {
    flag.allOptions = [flag.correctOption, ...generateRandomOptions(flag.correctOption, ['Option2', 'Option3', 'Option4'])];
  });
  
  export default flags;
  