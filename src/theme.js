import {createTheme} from "@mui/material";
import {amber, lightBlue} from "@mui/material/colors";

const theme = createTheme({
    palette: {
        primary: amber,
        secondary: lightBlue,
    },
    colors: {
        bgColor: '#3e3e3e',
        bgLightColor: '#888',
        bgLighterColor: '#DADADA',
        mainAccentColor: '#fecc01'
    }
})

export default theme;