$(document).ready(() => {
  var database = [];

  // populate table by params
  const populate = (localDatabase) => {
    $("tbody").empty();
    for (var i = 0; i < localDatabase.length; i++) {
      let deleteButton =
        '<button class="delete" value=' +
        localDatabase[i].contact +
        ">Delete</button>";
      $("tbody").append(
        "<tr><td>" +
          (i + 1) +
          "</td><td>" +
          (localDatabase[i].fname + " " + localDatabase[i].lname) +
          "</td><td>" +
          localDatabase[i].contact +
          "</td><td>" +
          deleteButton +
          "</td></tr>"
      );
    }

    //handle deleting ( after table populate )
    $(".delete").click(function () {
      database = database.filter((data) => data.contact != this.value);
      populate(database);
      alert("deletion successful");
    });
  };

  //handle submiting
  $("form").on("submit", function (e) {
    const data = {};
    const myFormData = new FormData(e.target);
    myFormData.forEach((value, key) => (data[key] = value));
    if (data["fname"] === "" || data["lname"] === "" || data["contact"] === "")
      alert("All inputs are mandatory!");
    else if (
      database.find((item) => item.contact === data.contact) ||
      database.find(
        (item) => item.fname === data.fname && item.lname === data.lname
      )
    )
      alert("Name and contact info must be unique!");
    else {
      database.push(data);
    }
    populate(database);
    this.reset();
    e.preventDefault();
  });

  //handle sorting
  $("#fullName").click(() => {
    function cmp(data1, data2) {
      let name1 = data1.fname + data1.lname;
      let name2 = data2.fname + data2.lname;
      name1 = name1.toLowerCase();
      name2 = name2.toLowerCase();
      if (name1 < name2) return -1;
      else if (name1 > name2) return 1;
      else return 0;
    }
    database.sort(cmp);
    populate(database);
  });

  //handle searching
  $("#search").on("input", function () {
    let searchTerm = this.value;
    let newDatabase = database.filter((obj) => {
      let total_name = obj.fname + " " + obj.lname;
      total_name = total_name.toLowerCase();
      return total_name.includes(searchTerm.toLowerCase());
    });
    populate(newDatabase);
  });
});
