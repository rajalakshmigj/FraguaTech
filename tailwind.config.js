/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        'lite-red': '#ff0000',
        'gray': '#7d7d7d',
        'hover-red': '#ce2d42',
        'dark-gray' : '#666666',
        'light-gray': '#cbcbcb',
        'sky-blue': '#66afe9',
        'blue': '#337ab7',
        'hover-blue': '#23527c',
      },
      fontSize: {
        xs : '12px',
        sm: '14px',
        ssm: '13px',
        base: '1rem',
        xl: '1.25rem',
        '2xl': '1.563rem',
        '3xl': '1.953rem',
        '4xl': '2.441rem',
        '5xl': '3.052rem',
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [
    // function ({ addUtilities }) {
    //   const newUtilities = {
    //     ".scrollbar-thin": {
    //       scrollbarWidth: "thin",
    //       scrollbarColor: "black",
    //     },
    //     ".scrollbar-webkit": {
    //       "&::-webkit-scrollbar": {
    //         width: "8px"
    //       },
    //       "&::-webkit-scrollbar-track": {
    //         background: "white"
    //       },
    //       "&::-webkit-scrollbar-thumb": {
    //         backgroundColor: "gray",
    //         borderRadius: "2px",
    //         border: "1px solid white"
    //       }
    //     },
    //     ".sidebar-scroll": {
    //       "&::-webkit-scrollbar": {
    //         width: "6px",
    //         height: "calc(100vh - 672px)",
    //       },
    //       "&::-webkit-scrollbar-track": {
    //         background: "white",
    //       },
    //       "&::-webkit-scrollbar-thumb": {
    //         backgroundColor: "gray",
    //         borderRadius: "3px",
    //         border: "1px solid white",
    //       },
    //       "&.hide-scrollbar::-webkit-scrollbar-thumb": {
    //         opacity: 0,
    //       },
    //     }
    //   };

    //   addUtilities(newUtilities, ["responsive", "hover"]);
    // }
  ],

  // plugins: [
  //   function ({addUtilities}){
  //     const newUtilities = {
  //       ".scrollbar-thin" : {
  //         scrollbarWidth : "thin",
  //         scrollbarColor : "black",
  //       },
  //       ".scrollbar-webkit" : {
  //         "&::-webkit-scrollbar" : {
  //           width : "8px"
  //         },
  //         "&::-webkit-scrollbar-track" : {
  //           background : "white"
  //         },
  //         "&::-webkit-scrollbar-thumb" : {
  //           backgroundColor : "gray",
  //           borderRadius : "2px",
  //           border : "1px solid white"
  //         }
  //       }
  //     }

  //     addUtilities(newUtilities, ["responsive", "hover"])
  //   }
  // ],
}