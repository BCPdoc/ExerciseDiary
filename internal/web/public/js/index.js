var id = 0;
var today = null;

function addExercise(name, weight, reps, count, notes, ID) {
    // console.log('NAME =', name);

    id = id + 1;
    html_to_insert = `<tr id="${id}">
        <td>
            <input name="name" type="text" class="form-control" colspan="3" value="${name}">
        </td>
        <td>
            <input name="weight" type="number" step="any" min="0" class="form-control" value="${weight}">
        </td><td>
            <input name="reps" type="number" min="0" class="form-control" value="${reps}">
        </td><td>
            <input name="count" type="number" min="0" class="form-control" value="${count}">
        </td>
        <td>
            <input name="notes" type="text" class="form-control" colspan="2" value="${notes}">
        </td>
        <td>
            <button class="btn del-set-button" type="button" title="Delete" onclick="delExercise(${id})">
                <i class="bi bi-x-square"></i>
            </button>
        </td>
        <td>
            <input name="ID" type="text" class="form-control" value="${ID}">
        </td>
    </tr>`;

    document.getElementById('todayEx').insertAdjacentHTML('beforeend', html_to_insert);
};

function setFormContent(sets, date) {
    window.sessionStorage.setItem("today", date);
    document.getElementById('todayEx').innerHTML = "";
    document.getElementById("formDate").value = date;
    document.getElementById("realDate").value = date;

    if (sets) {
        let len = sets.length;
        for (let i = 0 ; i < len; i++) {
            if (sets[i].Date == date) {
                addExercise(sets[i].Name, sets[i].Weight, sets[i].Reps, sets[i].Count, sets[i].Notes, sets[i].ExID);
            }
        }
    }
};

function setFormDate(sets) {
    today = document.getElementById("realDate").value;
    if (!today) {
        today = window.sessionStorage.getItem("today");

        if (!today) {
            today = new Date().toJSON().slice(0, 10);
        }
    }

    setFormContent(sets, today);
};

function setWeightDate() {
    let date = document.getElementById("realDate").value;
    document.getElementById("weightDate").value = date;
};

function delExercise(exID) {

    document.getElementById(exID).remove();
};

function moveDayLeftRight(where, sets) {
    dateStr = document.getElementById("realDate").value;

    let year  = dateStr.substring(0,4);
    let month = dateStr.substring(5,7);
    let day   = dateStr.substring(8,10);
    var date  = new Date(year, month-1, day);

    date.setDate(date.getDate() + parseInt(where));
    let left = date.toLocaleDateString('en-CA');

    // console.log('LEFT =', left);

    setFormContent(sets, left);
};

function addAllGroup(exs, gr) {

    // console.log('GR =', gr);
    // console.log('SETS =', exs);

    if (exs) {
        let len = exs.length;
        for (let i = 0 ; i < len; i++) {
            if (exs[i].Group == gr) {
                addExercise(exs[i].Name, exs[i].Weight, exs[i].Reps, exs[i].Count, exs[i].Notes, exs[i].ID);
            }
        }
    }
}