export default function (){
    if(document.getElementById("rainfield")) {
        let c = document.getElementById("rainfield"),
            ctx = c.getContext("2d"),
            fillcolor = "rgba(25, 100, 126, 0.05)",
            textcolor = "#0F0",
            letters = "1234567890*+-qweQWERTYUIOPASDFGHJKLZXCVBNM,./;'[]",
            font_size = 10,
            fontstring=font_size + "px arial",
            columns = window.innerWidth/font_size,
            drops = [];

        c.height = window.innerHeight;
        c.width = window.innerWidth;

        letters = letters.split("");


        for(let x = 0; x < columns; x++){
            drops[x] = 1;
        }

        setInterval(()=>{
            ctx.fillStyle = fillcolor;
            ctx.fillRect(0, 0, c.width, c.height);

            ctx.fillStyle = textcolor;
            ctx.font = fontstring;

            for(let i = 0; i < drops.length; i++)
            {
                let text = letters[Math.floor(Math.random()*letters.length)];

                ctx.fillText(text, i*font_size, drops[i]*font_size);

                if(drops[i]*font_size > c.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }, 100);
    }
}
