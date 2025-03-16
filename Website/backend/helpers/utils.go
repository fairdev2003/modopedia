package helpers

import (
	"bytes"
	"errors"
	"fmt"
	"github.com/disintegration/imaging"
	"image"
	"io"
	"net/http"
	"strconv"
	"strings"
	"time"
)

func LOGGER(params ...string) {
	year, month, day := time.Now().Date()
	yearString := strconv.Itoa(int(year))
	monthString := strconv.Itoa(int(month))
	dayString := strconv.Itoa(day)
	minute := strconv.Itoa(time.Now().Minute())
	hour := strconv.Itoa(time.Now().Hour())
	finalString := "| " + yearString + "-" + monthString + "-" + dayString + " " + hour + ":" + minute + " | LOG >>> " + strings.Join(params, " ")
	fmt.Println(finalString)
}

func checkImageHeaders(url string) error {
	resp, err := http.Get(url)
	if err != nil {
		return fmt.Errorf("error fetching image: %w", err)
	}
	defer resp.Body.Close()

	fmt.Println("Content-Type:", resp.Header.Get("Content-Type"))
	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("failed to fetch image, status code: %d", resp.StatusCode)
	}

	buffer := make([]byte, 20)
	_, err = resp.Body.Read(buffer)
	if err != nil {
		return fmt.Errorf("error reading image data: %w", err)
	}

	fmt.Printf("First 20 bytes: %x\n", buffer)
	return nil
}

func FetchImageFromURL(url string) (image.Image, error) {

	if strings.HasSuffix(url, ".webp") {
		return nil, errors.New("webp not supported")
	}

	resp, err := http.Get(url)
	if err != nil {
		return nil, fmt.Errorf("error fetching image: %w", err)
	}
	defer resp.Body.Close()

	// Read the entire image body into memory
	imgData, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("error reading image data: %w", err)
	}

	// Decode the image from the byte data
	img, err := imaging.Decode(bytes.NewReader(imgData))
	if err != nil {
		return nil, fmt.Errorf("error decoding image: %w", err)
	}

	return img, nil
}

func MostCommonColor(img image.Image) string {
	colorCounts := make(map[string]int)
	bounds := img.Bounds()

	for y := bounds.Min.Y; y < bounds.Max.Y; y++ {
		for x := bounds.Min.X; x < bounds.Max.X; x++ {
			r, g, b, _ := img.At(x, y).RGBA()
			hexColor := fmt.Sprintf("#%02X%02X%02X", r>>8, g>>8, b>>8)
			colorCounts[hexColor]++
		}
	}

	var mostCommon string
	maxCount := 0
	for hex, count := range colorCounts {
		if count > maxCount {
			maxCount = count
			mostCommon = hex
		}
	}

	return mostCommon
}
