const fs = require('fs');
const path = require('path');
const csv = require('csv-parse/lib/sync');

// data files are stored under components/analytics/data
// use consolidated file that includes 2019-2023 data
const dataPath = path.join(__dirname, '..', 'src', 'components', 'analytics', 'data', 'Placement_Data_2019_2023.csv');

function loadData() {
  const raw = fs.readFileSync(dataPath, 'utf8');
  // allow rows that may have fewer/more columns (Notes added later) without failing
  const records = csv(raw, { columns: true, skip_empty_lines: true, relax_column_count: true });
  // filter out summary rows that were accidentally appended to the CSV (e.g. TOTAL rows or blank company)
  const filtered = records.filter(r => {
    const comp = (r.Company || '').toString().trim();
    if (!comp) return false;
    if (comp.toUpperCase() === 'TOTAL') return false;
    return true;
  });

  return filtered.map(r => ({
    SNo: r.SNo,
    Date: r.Date,
    Company: r.Company,
    CSE: Number(r.CSE || 0),
    ISE: Number(r.ISE || 0),
    ECE: Number(r.ECE || 0),
    EI: Number(r.EI || 0),
    ME: Number(r.ME || 0),
    IEM: Number(r.IEM || 0),
    CVL: Number(r.CVL || 0),
    PG: Number(r.PG || 0),
    TotalOffers: Number(r.TotalOffers || 0),
    CTC_LPA: Number(r.CTC_LPA || 0)
  }));
}

function analyze(records) {
  const totals = {
    drives: records.length,
    totalOffers: 0,
    dept: { CSE:0, ISE:0, ECE:0, EI:0, ME:0, IEM:0, CVL:0, PG:0 },
    ctcWeightedSum: 0,
    ctcOfferSum: 0,
    topRecruiters: []
  };

  records.forEach(r => {
    totals.totalOffers += r.TotalOffers;
    totals.dept.CSE += r.CSE;
    totals.dept.ISE += r.ISE;
    totals.dept.ECE += r.ECE;
    totals.dept.EI += r.EI;
    totals.dept.ME += r.ME;
    totals.dept.IEM += r.IEM;
    totals.dept.CVL += r.CVL;
    totals.dept.PG += r.PG;

    if (r.CTC_LPA > 0 && r.TotalOffers > 0) {
      totals.ctcWeightedSum += r.CTC_LPA * r.TotalOffers;
      totals.ctcOfferSum += r.TotalOffers;
    }

    totals.topRecruiters.push({ company: r.Company, offers: r.TotalOffers, ctc: r.CTC_LPA });
  });

  totals.avgCTC = totals.ctcOfferSum > 0 ? (totals.ctcWeightedSum / totals.ctcOfferSum) : 0;

  totals.topRecruiters.sort((a,b) => b.offers - a.offers);
  totals.top5 = totals.topRecruiters.slice(0,5);

  return totals;
}

function main() {
  const records = loadData();
  const summary = analyze(records);
  const outPath = path.join(__dirname, '..', 'src', 'data', 'placement_summary_2022_2023.json');
  fs.writeFileSync(outPath, JSON.stringify(summary, null, 2));
  console.log('Summary written to', outPath);
  console.log(JSON.stringify(summary, null, 2));
}

main();

// Usage: node frontend/scripts/analyze_placement.cjs
