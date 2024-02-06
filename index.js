const PatternInput = document.querySelector("#PatternInput");
const submit = document.querySelector(".submit");
const text = document.querySelector(".text");
const Pdf_button  =document.querySelector("#Pdf_button")




let Stringyfied_Text = text.innerText;
let temp =""; // stores the previou entered pattern

fileInput.addEventListener('change', function (event) {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
        const { name } = selectedFile;
        const ext = name.toLowerCase().substring(name.lastIndexOf('.') + 1);
        const docToText = new DocToText();

        // single file extract to text
        docToText.extractToText(selectedFile, ext)
            .then(function (File_Data) {
                // Handle the extracted text
                text.innerHTML = File_Data;
                
                // console.log('Extracted Text:', text);
            }).catch(function (error) {
                // Handle the extraction error
                console.error('Extraction Error:', error);
            });
    }
});

submit.addEventListener("click", () => {

    let Pattern = PatternInput.value;
    if(temp!== PatternInput.value)
    {
        Stringyfied_Text = text.innerText;
        KMP_Matcher(Stringyfied_Text, Pattern);
        text.innerHTML = Stringyfied_Text;
         temp = PatternInput.value;

    }
   
});

let KMP_Matcher = function (T, P) {
    let n = T.length,
        m = P.length;
    let Prefix_values = Prefix_Function(P);

    let j = -1;

    for (let i = 0; i < n; i++) {
        while (j > -1 && P[j + 1] != T[i]) {
            j = Prefix_values[j];
        }

        if (P[j + 1] === T[i]) {
            j++;
        }

        if (j === m - 1) {
            // Match found, apply styling to the specific part
            const startIndex = i - m + 1;
            const endIndex = i + 1;
            Stringyfied_Text =
                Stringyfied_Text.substring(0, startIndex) +
                `<span style=" background-color:red;color:white;">${P}</span>` +
                Stringyfied_Text.substring(endIndex);
            j = Prefix_values[j];
        }
    }
};

let Prefix_Function = function (P) {
    let m = P.length;
    let Prefix_values = new Array(m);

    Prefix_values[0] = -1;
    let k = -1;

    for (let q = 1; q < m; q++) {
        while (k > -1 && P[k + 1] != P[q]) {
            k = Prefix_values[k];
        }

        if (P[k + 1] === P[q]) {
            k++;
        }

        Prefix_values[q] = k;
    }
    return Prefix_values;
};

