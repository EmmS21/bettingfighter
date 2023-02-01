from flask import Flask, request
import pickle
import pandas as pd
app = Flask(__name__)

@app.route('/predict', methods=['GET','POST'])

def home():
    df = pd.DataFrame(request.json["challenge"])
    random_forest = pickle.load(open("C:/Users/jasmi/OneDrive/Documents/GitHub/boxing/SpringboardCapstoneBoxingPredictionWebApp/ml model/randomforestModelComplete2.pkl","rb"))
    pred = df[["Win", "Loss", "KO", "KnockedOut", "last6", "Draw", "weight", "fight_count",
            "avgpts", "avgptsagainst", "age", "height", "Jab",
            "Power", "Total", "Avg", "opp_last6"]]
    pred_jabaccuracy = pd.DataFrame(pred['Jab'].values.tolist(), index=pred.index)
    pred_power = pd.DataFrame(pred['Power'].values.tolist(), index=pred.index)
    pred_total = pd.DataFrame(pred['Total'].values.tolist(), index=pred.index)
    pred_avg = pd.DataFrame(pred['Avg'].values.tolist(), index=pred.index)
    pred_avgjabs = pd.DataFrame(pred_avg['Jabs'].values.tolist(), index=pred_avg.index)
    pred_avgpower = pd.DataFrame(pred_avg['Power'].values.tolist(), index=pred_avg.index)
    pred_avgtotal = pd.DataFrame(pred_avg['Total'].values.tolist(), index=pred_avg.index)
    pred['Jab.accuracy'] = pred_jabaccuracy
    pred['Total.punch.accuracy'] = pred_total
    pred['Avg.Jabs.landed'] = pred_avgjabs
    pred['Avg.Power.punches.landed'] = pred_avgpower
    pred['Avg.Total.punches.landed'] = pred_avgtotal
    pred["Power.punch.accuracy"] = pred_power
    pred_win = pd.DataFrame(pred['Win'].values.tolist(), index=pred.index)
    pred_loss = pd.DataFrame(pred['Loss'].values.tolist(), index=pred.index)
    pred_knockedout = pd.DataFrame(pred['KnockedOut'].values.tolist(), index=pred.index)
    pred_ko_ratio = pd.DataFrame(pred['KO'].values.tolist(), index=pred.index)
    pred[['Win.KO', 'Win.Other']] = pred_win
    pred[['Loss.KO', 'Loss.Other']] = pred_loss
    pred['KnockedOut.ratio'] = pred_knockedout
    pred['KO.ratio'] = pred_ko_ratio
    pred.drop(["Win","Loss", "KO", "KnockedOut", "Jab", "Power", "Total", "Avg"], axis=1, inplace=True)
    pred[["opp_last6","Draw", "weight", "Loss.KO", "Loss.Other", "Win.KO", "Win.Other","fight_count",
             "avgpts","avgptsagainst", "KO.ratio", "KnockedOut.ratio", "age", "height",
            "Jab.accuracy", "Power.punch.accuracy", "Total.punch.accuracy", "Avg.Jabs.landed","Avg.Power.punches.landed",
            "Avg.Total.punches.landed", "last6"]] =  pred[["opp_last6","Draw", "weight", "Loss.KO", "Loss.Other", "Win.KO", "Win.Other","fight_count",
                                                           "avgpts","avgptsagainst", "KO.ratio", "KnockedOut.ratio", "age", "height",
                                                           "Jab.accuracy", "Power.punch.accuracy", "Total.punch.accuracy", "Avg.Jabs.landed","Avg.Power.punches.landed",
                                                           "Avg.Total.punches.landed", "last6"]]
    pred["Power.punch.accuracy"] = pd.json_normalize(pred["Power.punch.accuracy"])
    pred["Total.punch.accuracy"] = pd.json_normalize(pred["Total.punch.accuracy"])
    pred["Avg.Jabs.landed"] = pd.json_normalize(pred["Avg.Jabs.landed"])
    pred["Avg.Power.punches.landed"] = pd.json_normalize(pred["Avg.Power.punches.landed"])
    pred["Avg.Total.punches.landed"] = pd.json_normalize(pred["Avg.Total.punches.landed"])
    result = random_forest.predict_proba(pred)
    result = pd.DataFrame(result)
    return pd.DataFrame.to_json(result)

app.run(port=5000)

