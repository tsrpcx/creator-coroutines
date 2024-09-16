using System;
using System.IO;
using UnityEngine;

public static class LogToFile {
	private static string LogFilePath { get; set; }
	public static void WriterToFile(string message) {
		if (LogFilePath == null) {
			LogFilePath = Path.Combine(Application.persistentDataPath, "log-" + DateTime.Now.ToString("yyyy-MM-dd") + ".log");
			File.Create(LogFilePath).Close();
			UnityEngine.Debug.Log("Log File Path: " + LogFilePath);
		}

		using (StreamWriter writer = new StreamWriter(LogFilePath, true))
		    writer.WriteLine(message);
	}

	public static void Log(string message) {
		var msg = string.Format("{0,5:###.0000}", Time.realtimeSinceStartup) + "\t" + message;
		WriterToFile(msg);
		UnityEngine.Debug.Log(msg);
	}
}