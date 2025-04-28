import React, { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";

/**
 * Multivariable‑Calculus True / False quizzes in one file.
 * • "Easy"  – 25 foundational theorems (limits, partials, double integrals…)
 * • "Hard"  – 20 subtler results (inverse/implicit, Jacobians, vector calc…)
 * Toggle with the buttons; <Quiz/> handles grading & feedback.
 */

/***********************
 *  EASY – 25 QUESTIONS
 ***********************/
const easyQuestions = [
  { id: 1,  text: "If the limits of f(x, y) along two different paths give different numbers, the two‑variable limit still exists and equals the average of those numbers.", answer: false },
  { id: 2,  text: "Given any ε > 0, a limit exists provided we can find some δ > 0 (δ may depend on ε).", answer: true },
  { id: 3,  text: "(Two‑variable Squeeze Theorem) If g ≤ f ≤ h near (a, b) and both outer limits equal L, then the limit of f also equals L.", answer: true },
  { id: 4,  text: "The partial derivative f_x(a, b) equals lim_{h→0}[f(a+h,b)−f(a,b)]/h.", answer: true },
  { id: 5,  text: "If f_x and f_y are continuous near (a, b), then f_{xy}(a,b)=f_{yx}(a,b).", answer: true },
  { id: 6,  text: "A differentiable surface z=f(x,y) has tangent plane z−z₀ = f_x(a,b)(x−a)+f_y(a,b)(y−b).", answer: true },
  { id: 7,  text: "The linearization L(x,y) of f at (a,b) is f(a,b)−f_x(a,b)(x−a)−f_y(a,b)(y−b).", answer: false },
  { id: 8,  text: "If x=g(t), y=h(t) and z=f(x,y), then dz/dt = f_x·dx/dt + f_y·dy/dt.", answer: true },
  { id: 9,  text: "For x=x(s,t), y=y(s,t) we have ∂z/∂s = f_x·∂x/∂s + f_y·∂y/∂s.", answer: true },
  { id: 10, text: "The directional derivative D_u f equals ∇f·u only when u points in the same direction as ∇f.", answer: false },
  { id: 11, text: "∇f(a,b) is perpendicular to the level curve f(x,y)=f(a,b).", answer: true },
  { id: 12, text: "The maximum directional derivative equals ||∇f|| and occurs in the ∇f direction.", answer: true },
  { id: 13, text: "If f has a local extremum at (a,b) and f_x,f_y exist there, then f_x(a,b)=f_y(a,b)=0.", answer: true },
  { id: 14, text: "With D=f_{xx}f_{yy}−f_{xy}², if D>0 and f_{xx}(a,b)<0 then f(a,b) is a local minimum.", answer: false },
  { id: 15, text: "A continuous function on a closed, bounded domain attains absolute max and min values.", answer: true },
  { id: 16, text: "If m≤f≤M on D, then m·Area(D) ≤ ∬_D f ≤ M·Area(D).", answer: true },
  { id: 17, text: "Linearity: ∬_D[f+g]=⊬_D f + ∬_D g.", answer: true },
  { id: 18, text: "Monotonicity: If f ≥ g on D then ∬_D f ≤ ∬_D g.", answer: false },
  { id: 19, text: "Additivity: If D=D₁∪D₂ with overlapping interiors, then ∬_D f = ∬_{D₁}f + ∬_{D₂}f.", answer: false },
  { id: 20, text: "On a polar rectangle {a<r<b, α<θ<β}: ∬ f(x,y)dA = ∫_α^β∫_a^b f(r cosθ,r sinθ) r dr dθ.", answer: true },
  { id: 21, text: "A double integral equals lim_{m,n→∞} ΣΣ f(x̄_i,ȳ_j) ΔA.", answer: true },
  { id: 22, text: "The midpoint rule uses the center of every sub‑rectangle as its sample point.", answer: true },
  { id: 23, text: "The average value of f on R is (1/Area(R)) ∬_R f dA.", answer: true },
  { id: 24, text: "If f is continuous on [a,b]×[c,d], then ∬_R f dA = ∫_c^d ∫_a^b f dx dy.", answer: true },
  { id: 25, text: "When converting ∬_R f(x,y) dA to polar coordinates, the Jacobian contributes an extra factor r.", answer: true }
];

/***********************
 *  HARD – 20 QUESTIONS
 ***********************/
const hardQuestions = [
  { id: 1,  text: "Existence of all directional derivatives of f at a point guarantees that f is differentiable there.", answer: false },
  { id: 2,  text: "If f is differentiable at (a,b), then its gradient ∇f is necessarily continuous at (a,b).", answer: false },
  { id: 3,  text: "If the first‑order partials of f are continuous at (a,b), then f is differentiable at (a,b).", answer: true },
  { id: 4,  text: "If f has a local maximum at (a,b) and the Hessian at (a,b) is positive definite, the second‑derivative test confirms that maximum.", answer: false },
  { id: 5,  text: "When the Hessian at a critical point is positive‑semidefinite with det 0, the classical second‑derivative test is inconclusive.", answer: true },
  { id: 6,  text: "(Inverse Function Thm.) If det J_F(a)≠0 for a C¹ map F, then F has a C¹ local inverse near a.", answer: true },
  { id: 7,  text: "(Implicit Function Thm.) If G(x,y,z)=0 and ∂G/∂z≠0 at (a,b,c), we can locally solve z as a C¹ function of (x,y).", answer: true },
  { id: 8,  text: "The gradient ∇f points in the direction of steepest decrease of f.", answer: false },
  { id: 9,  text: "If a vector field F is conservative on a simply‑connected region, then the line integral around every closed curve is zero.", answer: true },
  { id: 10, text: "If curl F = 0 everywhere in a domain, then F is conservative in that domain.", answer: false },
  { id: 11, text: "(Divergence Thm.) For a C¹ vector field F, the flux through a closed surface equals ∭ div F over the volume.", answer: true },
  { id: 12, text: "Green's Theorem applies even when the boundary curve of the region intersects itself.", answer: false },
  { id: 13, text: "In a change of variables, one integrates |det J| (the abs. Jacobian).", answer: true },
  { id: 14, text: "For polar coordinates (x=r cosθ, y=r sinθ) the Jacobian determinant equals r².", answer: false },
  { id: 15, text: "If f(x,y)=g(r) with r=√(x²+y²) and g is differentiable at 0, then f_x(0,0)=0.", answer: true },
  { id: 16, text: "For a function homogeneous of degree k, Euler's formula gives x f_x + y f_y = k f.", answer: true },
  { id: 17, text: "The Lagrange‑multiplier method always yields global maxima/minima for one constraint.", answer: false },
  { id: 18, text: "A necessary and sufficient condition for a local extremum at (a,b) is ∇f(a,b)=0.", answer: false },
  { id: 19, text: "If div F = 0 throughout a simply‑connected domain, then the flux of F across every closed surface is zero.", answer: true },
  { id: 20, text: "Equality of mixed partials f_xy and f_yx holds whenever both derivatives exist, without continuity assumptions.", answer: false }
];

/***********************
 *  Quiz component
 ***********************/
function Quiz({ questions }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (id, val) => setAnswers(prev => ({ ...prev, [id]: val }));
  const score = questions.reduce((s, q) => s + (submitted && answers[q.id] === q.answer ? 1 : 0), 0);

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="space-y-6"
    >
      {questions.map(q => (
        <div key={q.id} className="rounded-2xl shadow p-4 bg-white/60 border">
          <h2 className="font-semibold mb-4">
            {q.id}. {q.text}
          </h2>
          <div className="flex items-center gap-4">
            {['True', 'False'].map((label, i) => (
              <label key={label} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name={`q-${q.id}`}
                  className="accent-blue-600"
                  onChange={() => handleChange(q.id, i === 0)}
                  disabled={submitted}
                />
                {label}
              </label>
            ))}
            {submitted && (
              answers[q.id] === q.answer ? (
                <CheckCircle className="w-6 h-6 text-green-600" />
              ) : (
                <XCircle className="w-6 h-6 text-red-600" />
              )
            )}
          </div>
          {submitted && answers[q.id] !== q.answer && (
            <p className="mt-2 text-sm text-gray-600 italic">
              Correct answer: {q.answer ? 'True' : 'False'}
            </p>
          )}
        </div>
      ))}

      {!submitted ? (
        <button
          type="submit"
          className="block w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold"
        >
          Submit
        </button>
      ) : (
        <div className="text-center space-y-4">
          <p className="text-2xl font-bold">
            Score: {score} / {questions.length}
          </p>
          <button
            type="button"
            onClick={() => {
              setAnswers({});
              setSubmitted(false);
            }}
            className="px-4 py-2 rounded-2xl bg-gray-200 hover:bg-gray-300"
          >
            Try Again
          </button>
        </div>
      )}
    </form>
  );
}

/***********************
 *  Wrapper component with mode toggle
 ***********************/
export default function MultivariableQuizApp() {
  const [mode, setMode] = useState('easy');
  const current = mode === 'easy' ? easyQuestions : hardQuestions;

  return (
    <div className="min-h-screen bg-slate-100 py-10 space-y-8 px-4">
      <h1 className="text-3xl font-bold text-center">Multivariable Calculus – True / False Quiz</h1>
      <div className="flex justify-center gap-4">
        {['easy', 'hard'].map(label => (
          <button
            key={label}
            onClick={() => setMode(label)}
            className={`px-4 py-2 rounded-2xl font-medium ${mode === label ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            {label === 'easy' ? 'Easy Set' : 'Hard Set'}
          </button>
        ))}
      </div>
      <Quiz questions={current} />
    </div>
  );
}
