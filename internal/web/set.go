package web

import (
	"log"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/shopspring/decimal"

	"github.com/bcpdoc/ExerciseDiary/internal/db"
	"github.com/bcpdoc/ExerciseDiary/internal/models"
)

func setHandler(c *gin.Context) {

	var formData []models.Set
	var oneSet models.Set
	var reps int
	var weight decimal.Decimal

	_ = c.PostFormMap("sets")

	formMap := c.Request.PostForm
	log.Println("MAP:", formMap)

	len := len(formMap["name"])
	log.Println("LEN:", len)
	date := formMap["date"][0]

	for i := 0; i < len; i++ {
		oneSet.Date = date
		oneSet.Name = formMap["name"][i]
		weight, _ = decimal.NewFromString(formMap["weight"][i])
		reps, _ = strconv.Atoi(formMap["reps"][i])
		oneSet.Weight = weight
		oneSet.Reps = reps
		/*
		count, _ = strconv.Atoi(formMap["count"][i])
		notes = formMap["notes"][i]
		oneSet.Count = count
		oneSet.Notes = notes

		exID, _ = decimal.NewFromString(formMap["ExID"][i])
		oneSet.ExID = exID
		*/

		formData = append(formData, oneSet)
	}

	db.BulkDeleteSetsByDate(appConfig.DBPath, date)
	db.BulkAddSets(appConfig.DBPath, formData)
	exData.Sets = db.SelectSet(appConfig.DBPath)

	// log.Println("FORM DATA:", formData)

	c.Redirect(http.StatusFound, "/")
}
