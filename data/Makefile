.PHONY: all clean

NODE=node --max-old-space-size=10240

all: country-simplified.geojson municities-with-risk-simplified.geojson barangays-with-risk-simplified.geojson

country-simplified.geojson: municities-simplified.topojson
	$(NODE) $(shell which topomerge) country=barangays \
	< municities-simplified.topojson \
	| $(NODE) $(shell which toposimplify) -p 0.0001 -f \
	| $(NODE) $(shell which topo2geo) country=country-simplified.geojson

municities-with-risk-simplified.geojson: municities-simplified.geojson risk-municities.csv
	geojson-join risk-municities.csv \
		--format=csv \
		--type="brightness":float \
		--type="cyclones":float \
		--type="exposure":float \
		--type="fault":float \
		--type="flood":float \
		--type="landslide":float \
		--type="pois":float \
		--type="population":float \
		--type="quake":float \
		--type="risk":float \
		--type="road":float \
		--type="tsunami":float \
		--type="volc":float \
		--againstField="Reg_Name" \
		--againstField="Pro_Name" \
		--againstField="Mun_Name" \
		--geojsonField="Reg_Name" \
		--geojsonField="Pro_Name" \
		--geojsonField="Mun_Name" \
		< municities-simplified.geojson \
		> municities-with-risk-simplified.geojson

municities-simplified.geojson: municities-simplified.topojson
	$(NODE) $(shell which topo2geo) municities=municities-simplified.geojson < municities-simplified.topojson

municities-simplified.topojson: barangays-with-risk.topojson
	$(NODE) $(shell which topomerge) -k 'd.properties.Mun_Code' municities=barangays \
	< barangays-with-risk.topojson \
	| $(NODE) $(shell which toposimplify) -p 0.0001 -f \
	> municities-simplified.topojson

barangays-with-risk-simplified.geojson: barangays-with-risk.topojson
	$(NODE) $(shell which topo2geo) barangays=barangays-with-risk-simplified.geojson < barangays-with-risk.topojson

barangays-with-risk.topojson: barangays-with-risk.ndjson
	$(NODE) $(shell which geo2topo) -n barangays=barangays-with-risk.ndjson \
	| $(NODE) $(shell which toposimplify) -p 0.000001 -f \
	| $(NODE) $(shell which topoquantize) 1e10 \
	> barangays-with-risk.topojson

barangays-with-risk.ndjson: barangays-with-risk.geojson
	jq -c -f ndjson.filter < barangays-with-risk.geojson > barangays-with-risk.ndjson

barangays-with-risk.geojson: barangays.geojson risk-barangays.csv
	geojson-join risk-barangays.csv \
		--format=csv \
		--type="brightness":float \
		--type="cyclones":float \
		--type="exposure":float \
		--type="fault":float \
		--type="flood":float \
		--type="hazard":float \
		--type="landslide":float \
		--type="poi_den":float \
		--type="pop_den":float \
		--type="quake":float \
		--type="risk":float \
		--type="road":float \
		--type="tsunami":float \
		--type="volc":float \
		--againstField="Reg_Name" \
		--againstField="Pro_Name" \
		--againstField="Mun_Name" \
		--againstField="Bgy_Name" \
		--geojsonField="Reg_Name" \
		--geojsonField="Pro_Name" \
		--geojsonField="Mun_Name" \
		--geojsonField="Bgy_Name" \
		< barangays.geojson \
		> barangays-with-risk.geojson

clean:
	rm -f \
		country-simplified.geojson \
		municities-with-risk-simplified.geojson \
		municities-simplified.geojson \
		municities-simplified.topojson \
		barangays-with-risk-simplified.geojson \
		barangays-with-risk.topojson \
		barangays-with-risk.ndjson \
		barangays-with-risk.geojson \

