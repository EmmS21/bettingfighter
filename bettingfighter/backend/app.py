from flask import Flask, request, jsonify
import pickle
import pandas as pd
import catboost
app = Flask(__name__)

@app.route('/predict', methods=['GET','POST'])

def home():
    df = pd.DataFrame(request.json["challenge"])
    cat_boost_model = pickle.load(open("C:/Users/jasmi/OneDrive/Documents/GitHub/boxing/SpringboardCapstoneBoxingPredictionWebApp/ml model/app/boxing/catmodelsummary.pkl","rb"))
    pred = df[["Win", "Loss", "KO", "KnockedOut", "last6"]]

    df_win = pd.DataFrame(df['Win'].values.tolist(), index=df.index)
    df_loss = pd.DataFrame(df['Loss'].values.tolist(), index=df.index)
    df_knockedout = pd.DataFrame(df['KnockedOut'].values.tolist(), index=df.index)
    df_ko_ratio = pd.DataFrame(df['KO'].values.tolist(), index=df.index)
    pred[['winKO', 'winOther']] = df_win
    pred[['lossKO', 'lossOther']] = df_loss
    pred['Knockedoutratio'] = df_knockedout
    pred['KOratio'] = df_ko_ratio
    pred['opp_last6'] = pred['last6']
    pred.drop(["Win","Loss", "KO", "KnockedOut","last6"], axis=1, inplace=True)
    pred = pred.unstack().to_frame().T
    pred.columns = pred.columns.map('{0[0]}_{0[1]}'.format)
    pred.rename(columns={"WinKO_0": "WinKO", "lossOther_0": "lossOther", "winOther_0": "winOther", "KOratio_0": "KOratio", "Knockedoutratio_0": "Knockedoutratio",
                                "opp_last6_1": "opp_last6", "KOratio_1": "oppKOratio", "winKO_1": "opp_WinKO", "lossOther_1": "opp_loss",
                                "lossOther_1": "opp_lossOther", "winOther_1":"opp_win", "lossKO_1": "opp_lossKO"})
    print(pred.columns)
    pred[['WinKO', "opp_winKO", "winOther", "opp_win", "lossKO", "opp_lossKO", "lossOther", "opp_lossOther", 
          "Knockedoutratio", "opp_knockedoutratio", "KOratio", "oppKOratio", "last6", "opp_last6"]] = pred[["winKO_0", "winKO_1", "winOther_0", "winOther_1", "lossKO_0",
                                                                                                            "lossKO_1", "lossOther_0", "lossOther_1", "Knockedoutratio_0",
                                                                                                            "Knockedoutratio_1", "KOratio_0", "KOratio_1", "opp_last6_0",
                                                                                                            "opp_last6_1"]]
    pred.drop(["winKO_0", "winKO_1", "winOther_0", "winOther_1", "lossKO_0", "lossKO_1", "lossOther_0", "lossOther_1", "Knockedoutratio_0",
               "Knockedoutratio_1", "KOratio_0", "KOratio_1", "opp_last6_0", "opp_last6_1"], axis=1, inplace=True)
    cat_boost_model.predict(pred)
    print(cat_boost_model)

    # print(complete_df)

    return 'Works'

app.run(port=5000)

