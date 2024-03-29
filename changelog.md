# Change Log

## v1.0.0

- RelaseDate: 2022.02.15
- Feature:
  1. Order CRUD
  2. Zone CRUD
  3. User CRUD
  4. Login
  5. Sign up
  6. Search zone by Tracking Number from order
  7. Search Google map by Lonlat or PlaceName
  8. Navigate order to google map in the table
  9. Upload order from template

## v1.1.0

- RelaseDate: 2022.03.22
- Feature:
  1. Upload order from simple/standar template
  2. Search order by updated date
- Improvement:
  1. Searching speed
  2. Backend perf
  3. Move "add order" function into new single page
- Bug fix:
  1. Searching error tracking number may cause crash

## v1.2.0

- RelaseDate: 2022.03.31
- Feature:
  1. Download order, according to search result by updated data
  2. Show all the order data
  3. After searching tracking number, will show the order's description
- Improvement:
  1. Backend response speed
- Bug fix:
  1. Edit order popup might can not show

## v2.0.0

- RelaseDate: 2022.07.23
- Feature:
  1. refactor, change map api to backend
  2. add go to view button when search by tracking number
- Improvement:
  1. Backend response speed
- Bug fix:

## v2.0.1

- RelaseDate: 2022.07.28
- Feature:
  1. add new order into list when post successfull
- Improvement:
  1. Backend response speed
  2. Add order by excel speed up
- Bug fix:
  1. Backend order entity expiredDate nullable

## v2.1.0

- RelaseDate: 2022.08.23
- Feature:
  1. add barcode scanner in search trackingNumber by camera
  2. add search TrackingNumberList
  3. add template download
- Improvement:
  1. UI/UX
- Bug fix:
  1. search "" in trackingNumber will trigger api call

## v2.2.0

- RelaseDate: 2022.09.25
- Feature:
  1. add Rule for auto pick
  2. add Backend check
  3. add login by accountId
  4. add post measure Data and Image
- Improvement:
  1. UI/UX
  2. Temp Remove scan by camera
  3. improve search TrackingNumberList

## v2.2.1

- RelaseDate: 2022.10.08
- Improvement:
  1. Change Map Service back to Google, continue using GeoCoding service to find place

## v2.3.0

- RelaseDate: 2022.12.04
- Improvement:
  1. Order Data uploading
  2. Order Data exporting

## v2.4.0

- RelaseDate: 2023.01.11
- Improvement:
  1. Backend add AutoSuggest before SearchAddress
  2. Add loading status in order searching
  3. Export data function enhancement
  4. Cancel default order loading
  5. orderGetByUpdatedAt max order from 5k to 10k

## v2.5.0

- RelaseDate: 2023.03.02
- Improvement:
  1. After uploading orders, show the mapping accuracy, zone info
  2. If mapping accuracy is below than 85, show error with warning
  3. User can select zone in uploading table or orders load tabel
  4. Auto select/manual select zone mode should show in API call and Code Scan
  5. Order detail will be moved to edit modal
  6. App backend API to receive the orders uploading
  7. Device captured image could be shown in data loading table
  8. Rules table page refinement to avoid cannot show or edit

## v2.5.2

- RelaseDate: 2023.05.07
- Improvement:
  1. Able to set order's zoneId to UnKnown
  2. Able to set order's zoneId to Remap
  3. Add historical order as ref to map new order
