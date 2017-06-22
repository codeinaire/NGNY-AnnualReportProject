json.extract! report, :id, :title, :header_colour, :footer_colour, :footer_date, :footer_company, :created_at, :updated_at
json.url report_url(report, format: :json)
